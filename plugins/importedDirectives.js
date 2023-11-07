// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

import { defineNuxtPlugin } from '#imports'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import VueDragscroll from "vue-dragscroll";

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(FloatingVue)
    vueApp.use(VueDragscroll);
})
