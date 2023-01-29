// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

import { defineStore } from "pinia";
import { Store } from "tauri-plugin-store-api";

export const useTauriStore = defineStore("tauriStore", {
    state: () => {
        return { store: new Store(".kanri.dat") };
    },
});
