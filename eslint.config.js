// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak
//
// SPDX-License-Identifier: CC0-1.0

import withNuxt from "./.nuxt/eslint.config.mjs";
import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt(
  ...tailwind.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
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
      "prettier/prettier": "error", // Treat Prettier issues as ESLint errors
    },
  },
  {
    ignores: ["src-tauri/**/*", "dist/**/*"],
  }
);
