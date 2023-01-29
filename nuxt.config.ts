// SPDX-FileCopyrightText: 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: CC0-1.0

import license from "rollup-plugin-license";
import "node:path"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: ['@/assets/css/scrollbars.css', '@/assets/css/global.css'],
    telemetry: false,
    app: { pageTransition: { name: 'page', mode: 'out-in' } },
    vite: {
        //@ts-ignore
        plugins: [
            license({
                thirdParty: {
                    output: "LICENSES_3RD_PARTY.txt",
                    includePrivate: true,
                },
            }),
        ],
    },
})
