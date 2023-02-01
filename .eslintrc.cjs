/*
 * SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
    root: true,
    extends: ["@nuxt/eslint-config", "plugin:tailwindcss/recommended"],
    ignorePatterns: ["src-tauri/**/*", "dist/**/*"],
    rules: {
        "vue/multi-word-component-names": "off",
        "vue/v-on-event-hyphenation": "off",
        "indent": ["warn", 4],
        "no-undef": "off",
        "tailwindcss/no-custom-classname": "off"
    },
    plugins: ["tailwindcss"]
};
