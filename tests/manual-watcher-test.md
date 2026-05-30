<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
SPDX-License-Identifier: GPL-3.0-or-later
-->

# Manual test: `.kanri.dat` live-reload watcher

The Tauri backend watches the data store and emits `kanri-dat-changed` when an
external process (the [kanri-bridge](https://github.com/Iamcodio/IAC-023-kanri-bridge)
daemon) writes `.kanri.dat`. The frontend reloads the board on that event, so
changes appear live with no "Import board" click.

A full Tauri UI test harness is out of scope; these are manual steps.

## Prerequisites

- A release build of this fork: `yarn install && yarn tauri build`
  (or `yarn tauri dev` for a faster loop).
- The kanri-bridge daemon built and runnable
  (`cargo build --release` in the IAC-023-kanri-bridge repo).
- Store path: `~/Library/Application Support/tech.trobonox.kanri/.kanri.dat`.

> Point the daemon at the **real** store only deliberately. For these tests you
> can either let it use the default path (real store, with Kanri open) or run
> Kanri against a test store by launching it with that data dir.

## Test 1 — live reload round-trip (spec check 3)

1. Launch the patched Kanri build and open a board with at least one card.
2. In a separate terminal, mutate a card via the daemon:
   ```bash
   curl -sX PATCH http://127.0.0.1:7457/boards/<bid>/cards/<cid> \
     -H 'Content-Type: application/json' -d '{"title":"Live edit"}'
   ```
3. **Expected:** within ~500ms the card title updates in the Kanri UI with no
   manual reload. The webview devtools console logs
   `[kanri-bridge] .kanri.dat changed externally — reloaded boards`.

## Test 2 — debounce (spec check 4)

1. With Kanri open, fire 10 mutations in a tight burst:
   ```bash
   for i in $(seq 1 10); do
     curl -sX PATCH http://127.0.0.1:7457/boards/<bid>/cards/<cid> \
       -H 'Content-Type: application/json' -d "{\"title\":\"v$i\"}" &
   done; wait
   ```
2. **Expected:** the devtools console shows the reload log line **once**, not
   ten times — the 150ms backend debounce collapses the burst into a single
   `kanri-dat-changed` emit.

## Test 3 — watcher cleanup on quit (spec check 5)

1. With Kanri running, note the open descriptors on the store dir:
   ```bash
   PID=$(pgrep -f 'kanri$' | head -1)
   lsof -p "$PID" | grep -c 'tech.trobonox.kanri'
   ```
2. Quit Kanri (Cmd-Q).
3. **Expected:** the process exits; `pgrep -f 'kanri$'` returns nothing and the
   descriptors are gone. The watcher thread and its FSEvents handle are owned
   by the process and released on exit — no zombie watcher.

## Test 4 — no regression (spec check 8)

With the patched build, confirm core flows still work:

- Drag a card between columns.
- Edit a card (title, description, color).
- Create a new board.

**Expected:** all succeed, no crashes, no console errors beyond the reload log.
