<!--
SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>

SPDX-License-Identifier: Apache-2.0
-->

# Contributing to Kanri
Thank you for showing interest into contributing to Kanri! First off, some general information:
Kanri is written in TypeScript, Vue (Nuxt v3), and Rust; and is licensed under the GPLv3 license. The landing page and docs site uses Astro with Starlight and [can be found here](https://github.com/trobonox/kanri-website). The documentation is still a big work in progress and if you would like to help, please reach out!

## A few rules
By contributing to Kanri, you confirm that the work you are submitting is yours and it will be licensed under the GPLv3 license of the project.

To ensure uniformity in Kanri's repository, every contributor must follow these set of rules:
* Commits must use the commit convention. (e.g. `feat: add x feature`)
* Have ESLint and Volar installed on your IDE for code formatting.
* Follow the general Vue conventions (except for kebab-casing and events)
* Use camelCasing on any function/method/property in code you've contributed.

Please also take a look at the [Code of Conduct](https://github.com/trobonox/kanri/blob/main/CODE_OF_CONDUCT.md).

## Here’s the process for contributing to Kanri
* Fork the Kanri repository, and clone it locally on your development machine.
* Find help wanted tickets that are up for grabs in GitHub or look at the things that are todo or work in progress in the roadmap (projects tab). Comment to let everyone know you’re working on it and let a core contributor assign the issue to you. If there’s no ticket for what you want to work on, you are free to continue with your changes but consider opening an issue or a discussion to make sure what you want to add is in line with the project vision.
* If in some case you need to use another dependency, create a new issue requesting for the package to be reviewed (by adding the "dependency request" label to the according issue).
* Your code should follow general Vue conventions, except for some exclusions, most notably camelCasing and events.
* After writing your code, make sure to lint your code with `yarn lint`.
* When your changes are checked in to your fork, make sure to test your code extensively. Your commits should also follow the commit conventions.
* Submit your pull request for a code review and wait for a Kanri core contributor to review it. When in doubt, ask for help in the Kanri Discord server or open an issue.
* Last but not least, make sure to have fun with the code!

We’re glad you’re here; good luck and have fun. 🤍

## Development workspace
### Recommended IDE setup
* IDE: Visual Studio Code (w/ Volar & ESLint)
* Node.js (LTS recommended) & NPM
* Yarn Package Manager
* [Tauri Development Environment](https://tauri.app/v1/guides/getting-started/prerequisites/)

### Building and testing your fork
While testing and making modifications to Kanri, make sure to familiarise yourself with these three commands.

```bash
# Install dependencies
yarn install

# Start debug tauri build
yarn tauri dev

# Lint and cleanup code
yarn lint

# Build tauri for production
yarn generate
yarn tauri build
```
