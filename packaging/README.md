# Building the Kanri Flatpak

This guide covers building a Kanri flatpak locally. It is intended for development purposes only. For installation as an end user, please refer to the README instead.

## Prerequisities

Before you can build the Flatpak, some tools for building must be installed.

- The `flatpak-builder` is required. Popular Linux distributions should have it available in their package manager.
  - More info: <https://docs.flatpak.org/en/latest/flatpak-builder.html>
- The Kanri flatpak is built with the Gnome SDK. The current version at the time of writing is 50, so the Gnome runtime and SDK would be installed like:
```bash
flatpak install org.gnome.Platform//50 org.gnome.Sdk//50
```
- There are also SDK extensions for making the binaries for `cargo` and `node` available during build:
```bash
flatpak install org.freedesktop.Sdk.Extension.rust-stable org.freedesktop.Sdk.Extension.node24
```
- As the build itself is executed offline, the dependencies for the Rust backend as well as the JavaScript frontend need to be declared in advance as flatpak sources. There are tools available for this: <https://github.com/flatpak/flatpak-builder-tools>
  - This project requires the builder tools located in `/node` and `/cargo`.
  - As both tools are written in Python but aren't available in the PyPI, I have found it easiest to clone the repository and create a virtual environment in my copy using `uv`. Within this virtual environment, the tools can be set up easily:
```bash
git clone https://github.com/flatpak/flatpak-builder-tools.git <YOUR_REPO_PATH>
cd <YOUR_REPO_PATH>
uv venv
uv pip install ./node
uv pip install ./cargo
```

Now everything should be ready to go! These steps only need to be taken once. To build the Flatpak, proceed to the section [Guide](#guide) below.

## Guide
- Update `node-sources.json`

```bash
flatpak-node-generator -o packaging/node-sources.json yarn yarn.lock
```

- Update `cargo-sources.json`

```bash
./flatpak-cargo-generator.py (...)/kanri/src-tauri/Cargo.lock -o (...)/kanri/packaging/cargo-sources.json
```

- Build flatpak

## Publish to Flathub
