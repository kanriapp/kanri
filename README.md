# Kanri

<p align="left"> 
  <b> A fully offline cross-platform Kanban Board desktop, with a focus on simplicity and user experience. Successor to Kanban Electron, rewritten using Tauri and Nuxt.js v3 with TypeScript. </b>
  <br> <br>
  <img src="https://github.com/trobonox/kanri/actions/workflows/release.yml/badge.svg?branch=release" alt="GitHub Build Status" />
  <br>
  <img src="https://wakatime.com/badge/user/be365b36-3fc6-4949-a760-a882bf44aad7/project/e222a792-8ba1-4987-97bd-baec10aa63fb.svg" alt="Wakatime Project Hours" />
  <br>
  <img src="https://img.shields.io/github/license/trobonox/kanri?style=flat)](https://opensource.org/licenses/Apache-2.0" alt="License Badge" />
  <img src="https://img.shields.io/github/v/release/trobonox/kanri" alt="Release Version Badge" />
  
</p>

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

