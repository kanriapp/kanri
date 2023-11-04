<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>

SPDX-License-Identifier: Apache-2.0
-->

<p align="center">
    <img src="https://user-images.githubusercontent.com/57040351/220428500-12b485e6-a512-4642-a74a-65d31304fae1.png" alt="Kanri banner" />
    <b> Kanban boards done right. Made with simplicity and user experience in mind, Kanri helps you create Kanban boards easily, right from your desktop. No internet connection or account needed! </b>
    <br> <br>
    <img src="https://github.com/trobonox/kanri/actions/workflows/release.yml/badge.svg" alt="GitHub Build Status" />
    <br>
    <img src="https://img.shields.io/github/license/trobonox/kanri" alt="Repo license" />
    <img src="https://api.reuse.software/badge/github.com/trobonox/kanri" alt="Reuse status" />
    <br>
    <img src="https://img.shields.io/discord/965559337726656552" alt="Discord Status" />
    <img src="https://img.shields.io/github/v/release/trobonox/kanri" alt="Release Version Badge" />
</p>

Screenshot of a fully customized version of the app, in the main Kanban board view:
![kanri_customized](https://github.com/trobonox/kanri/assets/57040351/176922c7-8edf-4256-8eb3-ec4d03ad4f75)

You can download it for free for Windows, Mac and Linux [from the GitHub releases!](https://github.com/trobonox/kanri/releases)

MacOS users can also install Kanri using Homebrew:
```bash
brew tap trobonox/cask
brew install kanri
```

Apple Silicon users, please run this command to prevent the error saying the app is broken:
```bash
xattr -cr /Applications/kanri.app
```

## ✨ Why Kanri?
- 🏙 Modern - featuring a clean design & new technologies like Tauri
- 👓 Familiar - uses a Kanban board layout (inspired by Trello®)
- 🧾 Offline - saves your data in a local `.json` file
- 🛠 Customizable - allows for custom themes, background images and card colors
- ⌨ With power users in mind - implements keyboard shortcuts to speed up board navigation

> **Note**: This project is still in active development, it is advised to make regular JSON exports to prevent data loss. Any testers that provide feedback are greatly appreciated.

## 📋 Roadmap
Long term vision for the project:
- 👷‍♂️ Improve current features and refactor to avoid tech debt
- ➕ Add additional small/mid-sized features with high impact (reminders, sub-tasks, etc.)
- 🚚 Work towards 1.0 release with features from the backlog like internationalization or a widget panel
- 🔍 After 1.0: Possibility of cloud sync with collaboration (could be self-hosted or managed by me)

A granular list of priorities can be found [in the roadmap in the projects tab of this GitHub repo](https://github.com/trobonox/kanri/projects).

This project is open for any contributions or feature requests, though always keep in mind that I am still a student with limited time and I might not be able to process every request immediately.

## 🛠 Contributing & Build Setup
If you want to contribute, please take a look at the [Contribution Guidelines](https://github.com/trobonox/kanri/blob/main/CONTRIBUTING.md).
The `main` branch is equivalent to a `dev` branch where development is done on - submit PRs here. The `release` branch is similar to a `stable` branch with the code of latest release.

**Build Setup**:
If you want to build the app, you need to install Node.js (latest LTS version recommended), a package manager like yarn and the [Tauri development environment](https://tauri.app/v1/guides/getting-started/prerequisites).
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
**Copyright (c) 2022-2023 trobonox (trobo@kanriapp.com)**. Licensed under the Apache 2.0 License.

Background image used in the showcase screenshot made by [Richard Horvath on Unsplash](https://unsplash.com/photos/_nWaeTF6qo0).


