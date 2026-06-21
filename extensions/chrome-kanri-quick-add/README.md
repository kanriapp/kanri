<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Kanri Quick Add Chrome Extension

This unpacked Chrome extension captures the active tab title and URL, lets you choose the target board inside the popup, then sends the task to a running Kanri app through the local quick-add bridge:

```text
http://127.0.0.1:47827/quick-add
```

```text
http://127.0.0.1:47827/boards
```

Kanri exposes the available board names to the popup while the desktop app is running. The selected board receives the task in its `Idea` column. If that board has no `Idea` column, Kanri uses the leftmost column.

## Local Install

1. Run Kanri locally with `yarn tauri dev`, or install/run the desktop app.
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select this folder: `extensions/chrome-kanri-quick-add`.

On macOS, the local bridge works in dev mode while Kanri is running.
