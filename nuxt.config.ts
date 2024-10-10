// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: CC0-1.0

import "node:path"
import license from "rollup-plugin-license";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: { pageTransition: { mode: "out-in", name: "page" } },
    css: ["@/assets/css/scrollbars.css", "@/assets/css/global.css"],
    devtools: {
        enabled: false
    },
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        'radix-vue/nuxt',
        "@nuxt/eslint",
        "@nuxtjs/i18n",
    ],
    ssr: false,
    telemetry: false,
    vite: {
        plugins: [
            license({
                thirdParty: {
                    includePrivate: true,
                    output: "./LICENSES_3RD_PARTY.txt",
                },
            }),
        ]
    },
    compatibilityDate: "2024-07-29"
});
