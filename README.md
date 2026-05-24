<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: Apache-2.0
-->

<p align="center">
    <img src="https://github.com/user-attachments/assets/14750ad4-a273-4779-972c-71868c2bbaa3" alt="Kanri banner" width="100%" /> <br>
    <b> Made with simplicity and user experience in mind, Kanri helps you create Kanban boards easily, right from your desktop. No internet connection or account needed. </b>
    <br> <br>
    <img src="https://img.shields.io/github/v/release/trobonox/kanri" alt="Release Version Badge" />
    <br>
    <img src="https://img.shields.io/github/license/trobonox/kanri" alt="Repo license" />
    <img src="https://api.reuse.software/badge/github.com/trobonox/kanri" alt="Reuse status" />
    <br>
    <div align="center">
        <a href="https://kanriapp.com/download">
            <img width="180" src="https://github.com/trobonox/kanri/assets/57040351/f13c0cd7-6f6e-44e7-95ce-74282acdae51"/> 
        </a>
        <a href="https://discord.gg/J3TZzKAcCy">
            <img width="180" src="https://github.com/trobonox/kanri/assets/57040351/837f5516-e996-456c-acbe-1c376b856c14"/> 
        </a>
    </div>
</p>


## Demo
![showcase_gif_kanri](https://github.com/user-attachments/assets/14d26751-cb5e-4164-a2f9-84e2b7dc200c)


## Download
Kanri is available for Windows, macOS and Linux (only supporting more recent versions of the respective operating systems).

There are several ways to download Kanri:
- **Recommended**: Select the installer for your operating system on the [official download page](https://kanriapp.com/download)
- The same downloads can also be found under the [GitHub releases](https://github.com/kanriapp/kanri/releases/)
- For macOS, you can also use Homebrew:
  ```bash
  brew install --no-quarantine kanriapp/cask/kanri
  ```
  
<details>
    <summary>Note for Apple Silicon macOS users:</summary>Because Kanri is not signed (there is no funding which would sponsor the required Apple Developer membership), you need to run the following command to prevent errors saying the app is broken:
    </summary>

    xattr -cr /Applications/kanri.app
</details>


## Why Kanri?
At it's core, Kanri has the philosophy "do one thing, and do it well". Kanri is supposed to be a simpler, more user-friendly *offline* alternative to other cloud-based Kanban applications.

No matter what features get added, your data will always be yours, and there will never be any cloud sync built in. In the future, there will most likely be an option to save individual boards to different file paths, which will make the usage of tools such as Syncthing easier, but it's up to you what you do with your data.

### Core Features
- Familiar Kanban board layout with customizable columns, cards, including rich-text descriptions, sub-tasks, due-dates and tags
- Customization options such as custom themes and board background images
- Offline data storage in one simple `.json` file
- Keyboard shortcuts for faster board navigation
- Basic data import from Trello, granular or full export for backups

## Roadmap
Long term vision for the project:
- 👷‍♂️ Improve current features and refactor to avoid tech debt
- ➕ Add additional small/mid-sized features with high impact (reminders, card images, etc.)
- 🚚 Work towards 1.0 release with features from the backlog like internationalization or a widget panel
- 🔍 After 1.0: Maintenance mode, smaller releases featuring fixes, new languages and simple features/UX improvements

A granular list of open tasks can be found [in the roadmap](https://github.com/orgs/kanriapp/projects/2).

This project is open for any contributions or feature requests as long as they are polite, provide enough context and remain patient (replies might take a few days). If you want to work on a feature which is in the backlog, please ask in the corresponding issue (or open one if there is none) about the status of the feature before implementing it.

> [!NOTE]
> This project is still in active development and is provided "AS IS". Please make regular backups/exports to prevent any data loss.

## 🛠 Contributing & Build Setup
If you want to contribute, please take a look at the [Contribution Guidelines](https://github.com/trobonox/kanri/blob/main/CONTRIBUTING.md).
The `main` branch is equivalent to a `dev` branch where development is done on - submit PRs here. The `release` branch is similar to a `stable` branch with the code of latest release.

**Build Setup**:
If you want to build the app, you need to install Node.js (latest LTS version recommended), a package manager like yarn and the [&nearr;&nbsp;Tauri development environment](https://tauri.app/start/prerequisites/).
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
**Copyright (c) 2022-2026 trobonox (trobo@kanriapp.com)**. Licensed under GPL v3 (with some files under Apache 2.0 or other licenses stated in the files themselves).
The Kanri logo, name and other branding are **NOT** open source, full copyright belongs to trobonox.

