module.exports = {
    root: true,
    extends: ["@nuxt/eslint-config", "plugin:tailwindcss/recommended"],
    ignorePatterns: ["src-tauri/**/*"],
    rules: {
        "vue/multi-word-component-names": "off",
        "vue/v-on-event-hyphenation": "off",
        "indent": ["warn", 4],
        "no-undef": "off",
        "tailwindcss/no-custom-classname": "off"
    },
    plugins: ["tailwindcss"]
};