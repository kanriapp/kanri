// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak
//
// SPDX-License-Identifier: CC0-1.0

import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    setupFiles: ["./test/setup.ts"],
    environmentOptions: {
      nuxt: {
        domEnvironment: "jsdom",
      },
    },
  },
});
