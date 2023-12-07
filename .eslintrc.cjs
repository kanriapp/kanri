/*
 * SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
    extends: ["@nuxt/eslint-config", "plugin:tailwindcss/recommended", "plugin:perfectionist/recommended-natural"],
    ignorePatterns: ["src-tauri/**/*", "dist/**/*"],
    plugins: ["tailwindcss", "perfectionist"],
    root: true,
    rules: {
        "indent": ["warn", 4],
        "no-undef": "off",
        "perfectionist/sort-vue-attributes": "off",
        "tailwindcss/no-custom-classname": "off",
        "vue/multi-word-component-names": "off",
        "vue/v-on-event-hyphenation": "off"
    }
};
