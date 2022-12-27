# Kanri
[![Release](https://github.com/trobonox/kanri/actions/workflows/release.yml/badge.svg)](https://github.com/trobonox/kanri/actions/workflows/release.yml)
[![Repo release version](https://img.shields.io/github/v/release/trobonox/kanri)](https://github.com/trobonox/kanri/releases)
[![Repo size](https://img.shields.io/github/repo-size/trobonox/kanri)](https://github.com/trobonox/kanri)
[![Repo license](https://img.shields.io/github/license/trobonox/kanri)](https://github.com/trobonox/kanri/blob/main/LICENSE)
[![Discord server](https://img.shields.io/discord/965559337726656552)](https://discord.gg/AVqHrvxB9C)

A fully offline cross-platform Kanban Board desktop, with a focus on simplicity and user experience. Successor to Kanban Electron, rewritten using Tauri and Nuxt.js v3 with TypeScript.

> **Note**: This is a fairly early and untested version, it is advised to make regular JSON exports and not save any business-critical data in this software yet. Any testers that provide feedback are greatly appreciated.

**Features**:
- Familiar Kanban board layout with clean design
- Fully offline with local data saves in a JSON file
- Theming system with 3 presets and custom theming ability (color scheme & custom background images)
- Keyboard shortcuts for easy Kanban board navigation
- Start page with board preview tiles
- Full data exports as a JSON file

## 🚀 Showcase

![Home Page Screenshot](https://user-images.githubusercontent.com/57040351/190853236-41c1b643-0d5d-4db9-8617-f3c07c5ea1f1.png)

![Board View Screenshot](https://user-images.githubusercontent.com/57040351/190853249-d3c36f6b-8b5f-4b5c-bfac-f823857f109c.png)

![Settings Screenshot](https://user-images.githubusercontent.com/57040351/190853264-29520615-568b-4063-92d6-0089834a1f7c.png)

## 📋 Roadmap (planned features)

See a full progress log in the Projects tab.

- [X] UI improvements like a bar for quick actions in the board view
- [ ] Cloud sync capabilities using a custom backend or Supabase
- [ ] More card properties like a due date or sub-tasks
- [ ] JSON imports (from previously made exports)
- [X] More reusable components (input & dialog)
- [ ] Add tests to prevent any critical bugs
- [ ] Add custom scrollbars for all pages
- [X] Custom backgrounds in board view
- [ ] Customizable animation speed
- [X] New logo and minor redesign
- [ ] Command palette/search bar
- [ ] Widgets panel on main page
- [ ] Showcase website

Open for any contributions or feature requests, though always keep in mind that I am still a student with limited time and I might not be able to process every request immediately.

## 🛠 Build Setup
Prerequisites: Node.js (LTS recommended) & NPM; [Tauri Development Environment](https://tauri.app/v1/guides/getting-started/prerequisites/)

```bash
# Install dependencies
yarn install

# Start debug tauri build
yarn tauri dev

# Build tauri for production
yarn tauri build

```

---

_Copyright (c) 2022 Trobonox_. Licensed under the Apache 2.0 License.

