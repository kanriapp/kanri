// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak
//
// SPDX-License-Identifier: CC0-1.0

import "node:path";
import license from "rollup-plugin-license";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: { pageTransition: { mode: "out-in", name: "page" } },
  css: ["@/assets/css/scrollbars.css", "@/assets/css/global.css"],
  devtools: {
    enabled: false,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "radix-vue/nuxt",
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
    ],
  },
  i18n: {
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "de", name: "Deutsch", file: "de.json" },
      { code: "es", name: "Español", file: "es.json" },
      { code: "pt_br", name: "Português (Brasil)", file: "pt_br.json" },
      { code: "zh_cn", name: "简体中文", file: "zh_cn.json" },
      { code: "uk", name: "українська", file: "uk.json" },
    ],
    defaultLocale: "en",
    langDir: "locales/",
    strategy: "no_prefix",
  },
  compatibilityDate: "2024-07-29",
});
