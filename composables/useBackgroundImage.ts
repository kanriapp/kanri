/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later

Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { Board } from "@/types/kanban-types";
import type { Ref } from "vue";

import { convertFileSrc } from "@tauri-apps/api/core";
import { normalize } from "@tauri-apps/api/path";
import { exists } from "@tauri-apps/plugin-fs";

import { getAverageColor, getContrast, rgbToHex } from "@/utils/colorUtils";

const DEFAULT_BLUR = "8px";
const DEFAULT_BRIGHTNESS = "100%";

export function useBackgroundImage(boardContent: Ref<Board | null>) {
  const bgCustom = ref("");
  const bgCustomNoResolution = ref("");
  const showCustomBgModal = ref(false);
  const bgImageLoaded = ref(false);
  const bgBlur = ref(DEFAULT_BLUR);
  const bgBrightness = ref(DEFAULT_BRIGHTNESS);
  const boardTitleColor = ref("");

  const cssVars = computed(() => {
    return {
      "--bg-brightness": bgBrightness.value,
      "--bg-custom-image": `url("${bgCustom.value}")`,
      "--blur-intensity": bgBlur.value,
    };
  });

  const refreshBoardTitleTextColor = async () => {
    if (bgCustom.value == null || !/\S/.test(bgCustom.value)) {
      boardTitleColor.value = "";
      return;
    }

    const averageColorFromBackground = await getAverageColor(bgCustom.value);
    const hexColor = rgbToHex(
      averageColorFromBackground[0],
      averageColorFromBackground[1],
      averageColorFromBackground[2]
    );

    boardTitleColor.value = getContrast(hexColor);
  };

  const updateBoardBackground = () => {
    if (!boardContent.value) return;

    boardContent.value.background = {
      blur: bgBlur.value,
      brightness: bgBrightness.value,
      src: bgCustomNoResolution.value,
    };
  };

  const initBackgroundImage = async () => {
    if (!boardContent.value || !boardContent.value.background) {
      bgImageLoaded.value = true;
      return;
    }

    bgCustomNoResolution.value = boardContent.value.background.src;

    const pathTauriObject = await normalize(boardContent.value.background.src);
    let bgImageExists = false;
    try {
      bgImageExists = await exists(pathTauriObject);
    } catch (e) {
      console.warn(
        "Background image might not exist, might be from an imported board from another device"
      );
      console.info(e);
      bgImageExists = false;
    }

    if (!bgImageExists) {
      console.warn(
        "Background image does not exist, removing background image from board"
      );
      boardContent.value.background = null;
      bgImageLoaded.value = true;
      return;
    }

    try {
      bgCustom.value = convertFileSrc(boardContent.value.background.src);
    } catch (e) {
      console.error("Error converting file src: ", e);
      bgCustom.value = "";
    }

    bgBlur.value = boardContent.value.background.blur;
    bgBrightness.value = boardContent.value.background.brightness;

    await refreshBoardTitleTextColor();
    bgImageLoaded.value = true;
  };

  const setBackgroundImage = async (img: string) => {
    bgCustomNoResolution.value = img;
    bgCustom.value = convertFileSrc(img);
    updateBoardBackground();

    await refreshBoardTitleTextColor();
  };

  const resetBackground = () => {
    bgCustom.value = "";
    bgCustomNoResolution.value = "";
    bgBlur.value = DEFAULT_BLUR;
    bgBrightness.value = DEFAULT_BRIGHTNESS;

    if (boardContent.value) {
      delete boardContent.value.background;
    }

    boardTitleColor.value = "";
  };

  const setBlur = (blurAmount: string) => {
    bgBlur.value = blurAmount;
    updateBoardBackground();
  };

  const setBrightness = (brightnessAmount: string) => {
    bgBrightness.value = brightnessAmount;
    updateBoardBackground();
  };

  return {
    bgCustom,
    bgCustomNoResolution,
    showCustomBgModal,
    bgImageLoaded,
    bgBlur,
    bgBrightness,
    boardTitleColor,
    cssVars,
    initBackgroundImage,
    refreshBoardTitleTextColor,
    setBackgroundImage,
    resetBackground,
    setBlur,
    setBrightness,
  };
}
