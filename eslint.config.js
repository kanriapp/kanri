// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: CC0-1.0

import withNuxt from './.nuxt/eslint.config.mjs';
import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import js from "@eslint/js"

export default withNuxt(
    ...tailwind.configs["flat/recommended"],
    js.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.ts', '**/*.vue'],
        rules: {
            "no-undef": "off",
            "tailwindcss/no-custom-classname": "off",
            "vue/html-indent": ["warn", 4],
            "vue/multi-word-component-names": "off",
            "vue/v-on-event-hyphenation": "off",
            "@typescript-eslint/no-invalid-void-type": "off",
            "@typescript-eslint/unified-signatures": "off",
            "prettier/prettier": "error"  // Treat Prettier issues as ESLint errors
        },
    },
    {
        ignores: ["src-tauri/**/*", "dist/**/*"]
    }
);
