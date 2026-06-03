<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: Apache-2.0
-->

# Contributing to Kanri

In its current state, Kanri is in a temporary "maintenance mode", for two reasons:
1. There is an ongoing rewrite for the storage backend, which is supposed to clean up some of the messy code that has built up over the years. This is meant to future-proof Kanri but requires significant thought put into it, so it will take an undefined amount of time until it is completed.
2. Kanri is primarily mainained by one person, with occasional help from some trusted regular contributors. This means that progress is slow and happens in bursts, and the release schedule is irregular.

## Takeaways for contributions

Until the rewrite mentioned above is complete, Kanri will only accept small, isolated PRs that fix a bug or security issue. 

### AI Guidelines

Kanri does not accept AI-generated contributions from first-time contributors. Moreover, even trusted contributors are not allowed to push code that is mostly AI generated.

Examples:
- If any commit is co-authored by an AI, it is not allowed in the Kanri codebase.
- If a PR description was obviously written by AI, the PR will be rejected immediately.
- If a commit or PR includes hundreds of lines of AI-generated code at once, the PR will most likely be rejected unless there has been some previous agreement beforehand (such as an interaction on Discord where a walkthrough of the solution has been done).

These guidelines are subject to change, and they leave room for interpretation on purpose.

## General rules
By contributing to Kanri, you confirm that the work you are submitting is yours and it will be licensed under the GPLv3 license of the project.

To ensure uniformity in Kanri's repository, every contributor must follow these set of rules:
* Commits must use the commit convention. (e.g. `feat: add x feature`)
* Have ESLint and Volar installed on your IDE for code formatting.
* Follow the general Vue conventions (except for kebab-casing and events)
* Add your GitHub username (and optionally email) to the license headers of the files you've worked on (changes of 3+ lines). If you are creating a new file, copy a GPLv3 license header from another file and keep the creators attribution (trobonox), then add yourself.

Please also take a look at the [Code of Conduct](https://github.com/trobonox/kanri/blob/main/CODE_OF_CONDUCT.md).


## Development workspace
### Recommended IDE setup
* IDE: Visual Studio Code (w/ Volar & ESLint)
* Node.js (LTS recommended) & NPM
* Yarn Package Manager
* [Tauri Development Environment](https://tauri.app/v1/guides/getting-started/prerequisites/)

### Building and testing your fork
Kanri does not have a comprehensive test suite yet, meaning each new feature requires manual testing. Please make sure to test that core features (primarily CRUD actions on boards) are not impacted by your changes and work as expected. In doubt, feel free to ask for help in the PR.

