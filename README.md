<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>

SPDX-License-Identifier: Apache-2.0
-->

# Kanri
[![Release](https://github.com/trobonox/kanri/actions/workflows/release.yml/badge.svg)](https://github.com/trobonox/kanri/actions/workflows/release.yml)
[![Repo release version](https://img.shields.io/github/v/release/trobonox/kanri)](https://github.com/trobonox/kanri/releases)
[![Repo license](https://img.shields.io/github/license/trobonox/kanri)](https://github.com/trobonox/kanri/blob/main/LICENSE)
[![Discord server](https://img.shields.io/discord/965559337726656552)](https://discord.gg/AVqHrvxB9C)
[![REUSE status](https://api.reuse.software/badge/github.com/trobonox/kanri)](https://api.reuse.software/info/github.com/trobonox/kanri)

Kanban boards done right. Made with simplicity and user experience in mind, Kanri helps you create kanban boards easily, right from your desktop. No internet connection or account needed!
![kanri_customized](https://user-images.githubusercontent.com/57040351/210173518-2d99f0cc-9df8-4e0f-8c3c-f86969fab268.png)

You can download it for free for Windows, Mac and Linux [from the GitHub releases!](https://github.com/trobonox/kanri/releases)

## ✨ Why Kanri?:
- 🏙 Modern - featuring a clean design & new technologies like Tauri
- 👓 Familiar - uses a Kanban board layout (inspired by Trello)
- 🧾 Offline - saves your data in a local `.json` file
- 🛠 Customizable - allows for custom themes, background images and card colors
- ⌨ With power users in mind - implements keyboard shortcuts to speed up board navigation

> **Note**: This is a fairly early and untested version, it is advised to make regular JSON exports. Any testers that provide feedback are greatly appreciated.

## 📋 Roadmap (planned features)
The long term vision for this app is to keep improving current features, expand it with useful new tools (which can be suggested by users) and in the end also add cloud sync capabilities which would also allow collaboration at a later stage. To address privacy concerns, the backend will have self hosting instructions alongside the identical version hosted by me.
Keep in mind that the cloud features are only set for the far future, a granular list of current priorities can be found [in the roadmap in the projects tab of this GitHub repo](https://github.com/trobonox/kanri/projects).

This project is open for any contributions or feature requests, though always keep in mind that I am still a student with limited time and I might not be able to process every request immediately.

## 🛠 Contributing & Build Setup
If you want to contribute, please take a look at the [Contribution Guidelines](https://github.com/trobonox/kanri/blob/main/CONTRIBUTING.md).

**Build Setup**:
If you want to build the app, you need to install Node.js (v16 LTS is recommended), a package manager like yarn and the [Tauri development environment](https://tauri.app/v1/guides/getting-started/prerequisites).
Then, depending on your use case you can run the commands below:

```bash
# Install dependencies
yarn install

# Start debug tauri build
yarn tauri dev

# Build tauri for production
yarn generate
yarn tauri build
```

---
**Copyright (c) 2022-2023 trobonox (<hello@trobo.tech>)**. Licensed under the Apache 2.0 License.

Background image used in the showcase screenshot made by [Richard Horvath on Unsplash](https://unsplash.com/photos/_nWaeTF6qo0).


