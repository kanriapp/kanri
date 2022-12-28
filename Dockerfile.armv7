FROM rust:latest

RUN dpkg --add-architecture armhf
RUN apt update && apt upgrade -y
RUN apt install -y --no-install-recommends \
                   g++-arm-linux-gnueabihf \
                   libc6-dev-armhf-cross \
                   libssl-dev:armhf \
                   libwebkit2gtk-4.0-dev:armhf \
                   build-essential \
                   curl:armhf \
                   wget:armhf \
                   libgtk-3-dev:armhf \
                   patchelf:armhf \
                   librsvg2-dev:armhf \
                   pkg-config
RUN rustup target add armv7-unknown-linux-gnueabihf
RUN rustup toolchain install stable-armv7-unknown-linux-gnueabihf
RUN cargo install tauri-cli --git https://github.com/tauri-apps/tauri
WORKDIR /app

ENV CARGO_TARGET_ARMV7_UNKNOWN_LINUX_GNUEABIHF_LINKER=arm-linux-gnueabihf-gcc \
    CC_armv7_unknown_linux_gnueabihf=arm-linux-gnueabihf-gcc \
    CXX_armv7_unknown_linux_gnueabihf=arm-linux-gnueabihf-g++ \
    PKG_CONFIG_PATH=/usr/lib/arm-linux-gnueabihf/pkgconfig \
    PKG_CONFIG_ALLOW_CROSS=1
WORKDIR /app/src-tauri
CMD ["cargo" ,"tauri",  "build", "--target", "armv7-unknown-linux-gnueabihf"]
