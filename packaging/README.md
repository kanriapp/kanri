# Building the Kanri Flatpak

This guide covers building a Kanri flatpak locally. It is intended for development purposes only. For installation as an end user, please refer to the [README](../README.md) instead.

## Prerequisities

Before you can build the Flatpak, some tools for building must be installed. The steps described here are needed only once to get started. Once everything is installed, refer to the [Guide](#guide) below to build the Flatpak.

- The `flatpak-builder` is required. Popular Linux distributions should have it available in their package manager.
  - More info: <https://docs.flatpak.org/en/latest/flatpak-builder.html>
- The Kanri Flatpak is built with the Gnome SDK. The current version at the time of writing is 50, so the Gnome runtime and SDK would be installed like:

```sh
$ flatpak install org.gnome.Platform//50 org.gnome.Sdk//50
```

- There are also SDK extensions for making the binaries for `cargo` and `node` available during build. For each, the current version at the time of writing is 25.08:
```sh
$ flatpak install org.freedesktop.Sdk.Extension.rust-stable//25.08 org.freedesktop.Sdk.Extension.node24//25.08
```
- As the build itself is executed offline, the dependencies for the Rust backend as well as the JavaScript frontend need to be declared in advance as flatpak sources. There are tools available for generating the source lists: <https://github.com/flatpak/flatpak-builder-tools>
  - This project requires the builder tools located in `/node` and `/cargo`.
  - As both tools are written in Python but aren't available in the PyPI, I have found it easiest to clone the repository and create a virtual environment in my copy using `uv`. Within this virtual environment, the tools can be set up easily:
```sh
$ git clone https://github.com/flatpak/flatpak-builder-tools.git <BUILDER_TOOLS_PATH>
$ cd <BUILDER_TOOLS_PATH>
$ uv venv
$ uv pip install ./node
$ uv pip install ./cargo
```

Now everything should be ready to go!

## Guide

This section describes building the Flatpak from the source repo, assuming that all [Prerequisities](#prerequisities) are installed.

### Updating the Source Lists

First, you need to update the source lists using the helper tools we installed above. Activate the virtual environment you created when installing and generate the source lists for Rust and JavaScript:

```sh
$ cd <BUILDER_TOOLS_PATH>
$ source .venv/bin/activate
$ flatpak-node-generator -o <KANRI_REPO_PATH>/packaging/node-sources.json yarn yarn.lock
$ ./flatpak-cargo-generator.py <KANRI_REPO_PATH>/src-tauri/Cargo.lock -o <KANRI_REPO_PATH>/packaging/cargo-sources.json
```

> [!NOTE]
> Beware the different notations to call `flatpak-node-generator` and `./flatpak-cargo-generator.py`. This difference is intentional and based in how the scripts are packaged in the source repository.

### Build the Flatpak

Now everything is in place! Build the Flatpak:

```sh
$ cd <KANRI_REPO_PATH>
$ flatpak-builder --install flatpak ./packaging/com.kanriapp.Kanri.yml
```

You can run it with:
```sh
$ flatpak run com.kanriapp.Kanri
```

## Publish to Flathub
