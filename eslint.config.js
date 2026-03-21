// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gitoak
//
// SPDX-License-Identifier: CC0-1.0

import withNuxt from "./.nuxt/eslint.config.mjs";
import tailwind from "eslint-plugin-tailwindcss";
import noStoreOutsideStores from "./eslint-rules/no-store-outside-stores.js";

export default withNuxt(
  ...tailwind.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "no-undef": "off",
      "tailwindcss/no-custom-classname": "off",
      "vue/html-indent": "off",
      "vue/multi-word-component-names": "off",
      "vue/v-on-event-hyphenation": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/unified-signatures": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.vue"],
    plugins: {
      custom: {
        rules: {
          'no-store-outside-stores': noStoreOutsideStores,
        },
      },
    },
    rules: {
      'custom/no-store-outside-stores': 'warn',
    },
  },
  {
    ignores: ["src-tauri/**/*", "dist/**/*", "pages/licenses/**/*"],
  }
);
