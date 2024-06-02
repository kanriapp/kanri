<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
    <nav
        :class="zIndexDown ? '' : 'z-50'"
        class="border-elevation-1 bg-sidebar mr-8 flex h-screen flex-col items-center justify-between overflow-hidden border-r-2 px-8 pb-6 pt-5 shadow-md"
    >
        <ModalNewBoard
            v-show="newBoardModalVisible"
            @closeModal="newBoardModalVisible = false"
        />
        <Teleport to=".default-layout">
            <ModalHelp
                v-show="helpModalVisible"
                @closeModal="helpModalVisible = false"
            />
        </Teleport>

        <section
            id="items-top"
            class="flex flex-col items-center gap-4"
        >
            <div
                id="logo"
                class="flex flex-row rounded-md"
            >
                <IconKanri
                    class="text-accent-logo-icon size-9 pl-1"
                    @click="$router.push('/')"
                />
            </div>

            <Tooltip v-if="showAddButton">
                <template #trigger>
                    <button
                        class="bg-elevation-2-hover transition-button rounded-md p-2"
                        @click="$router.push('/')"
                    >
                        <PhHouse class="size-7" />
                    </button>
                </template>

                <template #content>
                    Home
                </template>
            </Tooltip>

            <Tooltip v-else>
                <template #trigger>
                    <button
                        class="bg-elevation-2-hover transition-button rounded-md p-2"
                        @click="$router.go(-1)"
                    >
                        <PhArrowBendUpLeft class="size-7" />
                    </button>
                </template>

                <template #content>
                    Back
                </template>
            </Tooltip>

            <Tooltip v-if="showAddButton">
                <template #trigger>
                    <button
                        class="bg-elevation-2-hover transition-button rounded-md p-2"
                        @click="newBoardModalVisible = true"
                    >
                        <IconPhPlusCircleDuotone class="text-accent size-7" />
                    </button>
                </template>

                <template #content>
                    Create a new board
                </template>
            </Tooltip>
        </section>

        <section
            id="icons-bottom"
            class="flex flex-col items-center gap-4"
        >
            <Tooltip>
                <template #trigger>
                    <nuxt-link
                        to="/import"
                    >
                        <div class="bg-elevation-2-hover transition-button rounded-md p-2">
                            <PhArrowsLeftRight class="size-7" />
                        </div>
                    </nuxt-link>
                </template>

                <template #content>
                    Import/Export
                </template>
            </Tooltip>

            <Tooltip>
                <template #trigger>
                    <button
                        class="bg-elevation-2-hover transition-button rounded-md p-2"
                        @click="helpModalVisible = true"
                    >
                        <PhQuestion class="size-7" />
                    </button>
                </template>

                <template #content>
                    Help
                </template>
            </Tooltip>

            <Tooltip>
                <template #trigger>
                    <nuxt-link
                        to="/settings"
                    >
                        <div class="bg-elevation-2-hover transition-button rounded-md p-2">
                            <PhGearSix class="size-7" />
                        </div>
                    </nuxt-link>
                </template>

                <template #content>
                    Settings
                </template>
            </Tooltip>
        </section>
    </nav>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { PhArrowBendUpLeft, PhHouse } from "@phosphor-icons/vue";
import { PhArrowsLeftRight, PhGearSix, PhQuestion } from "@phosphor-icons/vue";

const store = useTauriStore().store;

const helpModalVisible = ref(false);
const newBoardModalVisible = ref(false);

const zIndexDown = ref(false);
const showAddButton = ref(true);

const savedColors: Ref<any> = ref(null);

onMounted(async () => {
    document.addEventListener("keydown", keyDownListener);

    savedColors.value = await store.get("colors");

    emitter.on("updateColors", async () => {
        savedColors.value = await store.get("colors");
    })

    emitter.on("zIndexDown", () => {
        zIndexDown.value = true;
    });

    emitter.on("zIndexBack", () => {
        zIndexDown.value = false;
    });

    emitter.on("openKanbanPage", () => {
        showAddButton.value = false;
    });

    emitter.on("closeKanbanPage", () => {
        showAddButton.value = true;
    });

    emitter.on("showSidebarBackArrow", () => {
        showAddButton.value = false;
    });

    emitter.on("hideSidebarBackArrow", () => {
        showAddButton.value = true;
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
});

const keyDownListener = (e: KeyboardEvent) => {
    if (e.key === "F1") {
        helpModalVisible.value = true;
        return;
    }
}
</script>

<style scoped>
.bg-sidebar {
    background: radial-gradient(circle at top left, var(--elevation-1) 10%, transparent);
}
</style>
