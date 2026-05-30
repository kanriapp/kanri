<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
SPDX-License-Identifier: GPL-3.0-or-later
-->

# Manual test: `.kanri.dat` live-reload watcher

The Tauri backend watches the data store and emits `kanri-dat-changed` when an
external process — the [kanri-bridge](https://github.com/Iamcodio/IAC-023-kanri-bridge)
daemon, which owns the store via an HTTP API on `127.0.0.1:7457` — writes
`.kanri.dat`. The frontend reloads the board on that event, so changes appear
live with no "Import board" click.

A full automated Tauri UI harness is out of scope; these steps are manual.
Each one is copy-paste; you should not need to pair with the agent.

---

## Setup (once)

**Store path** (shared by Kanri and the daemon):
`~/Library/Application Support/tech.trobonox.kanri/.kanri.dat`

These tests deliberately drive the **real** store so Kanri sees the writes.
That's safe: the daemon takes a rolling backup before every write
(`~/Library/Application Support/tech.iamcodio.kanri-bridge/backups/`). If you'd
rather not touch real data, first create a throwaway board in Kanri to mutate.

1. **Build + launch this patched Kanri** (from the fork checkout):
   ```bash
   corepack yarn install
   corepack yarn generate
   corepack yarn tauri build
   open "src-tauri/target/release/bundle/macos/kanri.app"
   ```
   For a faster dev loop you can use `corepack yarn tauri dev` instead.

2. **Build + run the kanri-bridge daemon** (from the IAC-023-kanri-bridge repo,
   in a second terminal). It defaults to the real store path above:
   ```bash
   cargo build --release
   ./target/release/kanri-bridge
   ```
   Leave it running. Health-check from a third terminal:
   ```bash
   curl -sf http://127.0.0.1:7457/healthz   # -> {"ok":true,...}
   ```

3. **Grab a board id + card id** to target. In Kanri, make sure a board has at
   least one card, then:
   ```bash
   curl -s http://127.0.0.1:7457/boards \
     | python3 -m json.tool | grep -E '"id"|"title"' | head
   ```
   Note a board `id` (BID) and a card `id` (CID) from the output. Export them
   so the snippets below are copy-paste:
   ```bash
   BID=<paste board id>
   CID=<paste card id>
   ```

4. **Watch the reload log.** Open the Kanri window's devtools console
   (right-click → Inspect Element, or the app's debug console). Each reload
   prints: `[kanri-bridge] .kanri.dat changed externally — reloaded boards`.

---

## Test 1 — live reload round-trip (spec check 3)

1. With Kanri open on the board, run:
   ```bash
   curl -sX PATCH "http://127.0.0.1:7457/boards/$BID/cards/$CID" \
     -H 'Content-Type: application/json' -d '{"title":"Live edit"}'
   ```
2. **Expected:** within ~500ms the card title changes to "Live edit" in the
   Kanri UI with no manual reload, and the console logs the reload line once.

✅ PASS if the UI updates live. ❌ FAIL if you must reload manually.

## Test 2 — debounce (spec check 4)

1. Fire 10 writes in a tight burst:
   ```bash
   for i in $(seq 1 10); do
     curl -sX PATCH "http://127.0.0.1:7457/boards/$BID/cards/$CID" \
       -H 'Content-Type: application/json' -d "{\"title\":\"v$i\"}" &
   done; wait
   ```
2. **Expected:** the console shows the reload log line **once** (or twice at
   most if the burst straddles the 150ms window) — not ten times. The card
   ends showing the last write.

✅ PASS if reloads ≪ 10 (effectively one). ❌ FAIL if it logs ~10 reloads.

## Test 3 — watcher cleanup on quit (spec check 5)

1. With Kanri running:
   ```bash
   PID=$(pgrep -f 'kanri.app/Contents/MacOS/kanri' | head -1)
   echo "pid=$PID"
   lsof -p "$PID" 2>/dev/null | grep -c 'tech.trobonox.kanri'   # baseline (>0)
   ```
2. Quit Kanri (Cmd-Q).
3. ```bash
   sleep 2
   pgrep -f 'kanri.app/Contents/MacOS/kanri' || echo "process gone"
   ```

✅ PASS if the process is gone after quit (the watcher thread + its FSEvents
handle are owned by the process and released by the OS on exit — no zombie).
❌ FAIL if a `kanri` process or its store fds linger.

## Test 4 — no regression (spec check 8)

With the patched build, exercise core flows by hand:

- Drag a card between columns.
- Edit a card (title, description, color).
- Create a new board, add a column, add a card.

✅ PASS if all succeed with no crash and no console errors beyond the reload
log line. ❌ FAIL on any crash or broken interaction.

---

## Reporting

Record PASS/FAIL for tests 1–4. All four PASS → spec checks 3, 4, 5, 8 are
green and the fork PR can be merged + the upstream PR opened.
