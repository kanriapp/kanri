// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: CC0-1.0

import "node:path"
import license from "rollup-plugin-license";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: { pageTransition: { mode: "out-in", name: "page" } },
    css: ["@/assets/css/scrollbars.css", "@/assets/css/global.css"],
    devtools: false,
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt", 'radix-vue/nuxt'],
    ssr: false,
    telemetry: false,
    vite: {
        //@ts-ignore
        plugins: [
            license({
                thirdParty: {
                    includePrivate: true,
                    output: "LICENSES_3RD_PARTY.txt",
                },
            }),
        ]
    }
});
