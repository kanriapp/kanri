use std::iter::Filter;
// SPDX-FileCopyrightText: 2019-2022, The Tauri Programme in the Commons Conservancy
// SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
use photon_rs::native::open_image;
use photon_rs::native::save_image;
use photon_rs::effects;

pub struct FilterConfig {
    brightness: f32,
    blur_radius: f32,
}

impl Default for FilterConfig {
    fn default() -> Self {
        FilterConfig {
            brightness: 0f32,
            blur_radius: 0f32,
        }
    }
}

pub fn filter_background_image(src_path: String, dest_path: String, filter_config: FilterConfig) {
    assert!(
        (0f32 <= filter_config.brightness && filter_config.brightness <= 1f32),
        "Invalid brightness value"
    );
    let mut img = open_image(src_path).expect("Source image file could not be opened");
    effects::adjust_brightness(&mut img, (-255f32 / filter_config.brightness) as i16);
    save_image(img, dest_path).expect("Processed image file could not be saved")
}
