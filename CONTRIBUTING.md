# Contributing to Kanri
Kanri is written in TypeScript, Vue, and Rust; and is licensed under the Apache 2.0 license.

## A few rules
By contributing to Kanri, you confirm that the work you are submitting is yours and it will be licensed under the Apache 2.0 license of the project. 

To ensure uniformity in Kanri's repository, every contributor must follow these set of rules:
* Commits must use the commit convention. (e.g. `feat: add x feature`
* Have ESLint and Volar installed on your IDE for code formatting.
* Follow the general Vue conventions (except for kebab-casing and events)
* Use camelCasing on any function/method/property in code you've contributed.

## Here’s the process for contributing to Kanri
* Fork the Kanri repository, and clone it locally on your development machine.
* Find help wanted tickets that are up for grabs in GitHub. Comment to let everyone know you’re working on it and let a core contributor assign the issue to you. If there’s no ticket for what you want to work on, you are free to continue with your changes.
* If in some case you need to use another dependency, create a new issue requesting for the package to be reviewed.
* Your code should follow general Vue conventions, except for some exclusions, most notably camelCasing and events
* After writing your code, make sure to lint your code with `yarn lint`.
* When your changes are checked in to your fork, make sure to test your code extensively. Your commits should also follow the commit conventions.
* Submit your pull request for a code review and wait for a Kanri core contributor to review it. When in doubt, ask for help in the Kanri Discord server.
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
yarn tauri build
```
