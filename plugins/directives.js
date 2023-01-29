// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("resizable", {
        mounted: function (el) {
            el.addEventListener("input", function (e) {
                e.target.style.height = "auto";
                e.target.style.height = (parseInt(e.target.scrollHeight) + 2).toString() + "px";
            });
        },
    });
});
