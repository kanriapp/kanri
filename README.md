# Kanri
[![Release](https://github.com/trobonox/kanri/actions/workflows/release.yml/badge.svg)](https://github.com/trobonox/kanri/actions/workflows/release.yml)
[![Repo size](https://img.shields.io/github/repo-size/trobonox/kanri)](https://github.com/trobonox/kanri)
[![Repo license](https://img.shields.io/github/license/trobonox/kanri)](https://github.com/trobonox/kanri/LICENSE)
[![Repo release version](https://img.shields.io/github/v/release/trobonox/kanri)](https://github.com/trobonox/kanri/releases)

A fully offline cross-platform Kanban Board desktop, with a focus on simplicity and user experience. Successor to Kanban Electron, rewritten using Tauri and Nuxt.js v3 with TypeScript.

⚠ **Please note: This is a very early version, it is advised to make regular JSON exports and not save any important data in this software yet.**

## 📋 Roadmap (planned features)

- [ ] UI improvements like a bar for quick actions in the board view
- [ ] Cloud sync capabilities using a custom backend or Supabase
- [ ] More card properties like a due date or sub-tasks
- [ ] Add tests to prevent any critical bugs
- [ ] Add custom scrollbars for all pages
- [ ] Custom backgrounds in board view
- [ ] Showcase website

Open for any contributions or feature requests, though always keep in mind that I am still a student with limited time and I might not be able to process every request immediately.

## 🚀 Showcase

![image](https://user-images.githubusercontent.com/57040351/187766715-29ba479d-185d-4db5-b2ba-45b17675848c.png)

![image](https://user-images.githubusercontent.com/57040351/187767394-fbc6c13a-f179-4d1a-a2f8-d85d31373d71.png)

![image](https://user-images.githubusercontent.com/57040351/187768053-ccfe97e3-6898-470b-9507-2d10d0035347.png)


## 🛠 Build Setup

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

