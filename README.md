<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>

SPDX-License-Identifier: Apache-2.0
-->

<p align="center">
    <img src="https://github.com/trobonox/kanri/assets/57040351/ea6e1c6b-3f1e-4a13-8382-224e2cfc4516" alt="Kanri banner" />
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

## 🚀 Demo
![kanri_demo_gif](https://github.com/trobonox/kanri/assets/57040351/fa7a9d79-3847-47cb-8325-6715477879f4)

## ⬇️ Download
You can download Kanri for Windows, Mac and Linux at [kanriapp.com](https://kanriapp.com), it's free!

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

## 📋 Roadmap
Long term vision for the project:
- 👷‍♂️ Improve current features and refactor to avoid tech debt
- ➕ Add additional small/mid-sized features with high impact (reminders, sub-tasks, etc.)
- 🚚 Work towards 1.0 release with features from the backlog like internationalization or a widget panel
- 🔍 After 1.0: Possibility of cloud sync with collaboration (could be self-hosted or managed by me)

A granular list of priorities can be found [in the roadmap in the projects tab of this GitHub repo](https://github.com/trobonox/kanri/projects).

This project is open for any contributions or feature requests, though always keep in mind that I am still a student with limited time and I might not be able to process every request immediately.

> [!NOTE]  
> This project is still in active development and is provided "AS IS". Please make regular backups/exports to prevent any data loss.

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
