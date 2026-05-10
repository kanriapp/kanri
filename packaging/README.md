# Building the Kanri Flatpak

## Prerequisities

- Install `flatpak-node-generator` to generate source info for Node packages
  - <https://github.com/flatpak/flatpak-builder-tools/blob/master/node/README.md>

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
