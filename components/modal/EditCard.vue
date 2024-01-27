<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <Modal
    :blur-background="false"
    @closeModal="
      $emit('closeModal', columnID);
      titleEditing = false;
      taskAddMode = false
    "
  >
    <template #content>
      <div class="flex min-h-[40rem] w-[36rem] flex-col">
        <div class="mb-6">
          <div class="flex flex-row items-start justify-between gap-12">
            <h1
              v-if="!titleEditing"
              :v-model="title"
              class="text-no-overflow pointer-events-auto min-w-[64px] pr-5 text-2xl font-bold"
              @click="enableTitleEditing()"
            >
              {{ title }}
            </h1>
            <input
              v-if="titleEditing"
              ref="titleInput"
              v-model="title"
              v-focus
              class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto text-xl focus:border-2 focus:border-dotted focus:outline-none"
              maxlength="1000"
              type="text"
              @blur="updateTitle"
              @keypress.enter="updateTitle"
            >
            <XMarkIcon
              class="text-accent-hover h-6 w-6 shrink-0 cursor-pointer"
              @click="$emit('closeModal', columnID)"
            />
          </div>
          <VDatePicker
            v-model="dueDate"
            mode="dateTime"
            is24hr
            @update:modelValue="updateDueDate"
          >
            <template #default="{ togglePopover, inputValue}">
              <button
                class="bg-elevation-2 bg-elevation-3-hover mt-1 flex items-center justify-center gap-2 rounded-md px-2 py-1"
                @click="() => togglePopover()"
              >
                <PhCalendar class="h-5 w-5" />
                <span v-if="dueDate">Due date: {{ inputValue }}</span>
                <span v-else>Set due date</span>
              </button>
            </template>
            <template #footer>
              <div class="w-full px-4 pb-3">
                <div class="mt-3 flex flex-row gap-4">
                  <SwitchRoot
                    v-model:checked="isDueDateCounterRelative"
                    class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                    @update:checked="updateDueDate"
                  >
                    <SwitchThumb
                      class="bg-button-text my-auto block h-[18px] w-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                    />
                  </SwitchRoot>
                  <p>Relative countdown</p>
                </div>
              </div>
            </template>
          </VDatePicker>
        </div>

        <div class="flex flex-col pr-10">
          <h2
            class="text-lg font-semibold"
          >
            Card Description
          </h2>
          <KanbanDescriptionEditor
            v-model="description"
            @editorBlurred="updateDescription"
          />
          <div class="mb-1 mt-6 flex flex-row items-center gap-2">
            <h2
              class="text-lg font-semibold"
            >
              Tasks
            </h2>
            <span class="text-dim-1 text-sm">({{ getCheckedTaskNumber }}/{{ tasks.length }})</span>
          </div>
          <ProgressRoot
            v-if="tasks"
            v-model="getTaskPercentage"
            class="bg-elevation-2 relative mb-4 h-2 w-full overflow-hidden rounded-full"
            style="transform: translateZ(0)"
          >
            <ProgressIndicator
              class="ease-[cubic-bezier(0.65, 0, 0.35, 1)] bg-accent-no-hover h-full w-full rounded-full transition-transform duration-[660ms]"
              :style="`transform: translateX(-${100 - getTaskPercentage}%)`"
            />
          </ProgressRoot>
          <div
            class="flex w-full flex-col gap-2"
          >
            <div
              v-if="tasks && tasks.length !== 0"
              class="flex max-h-[148px] w-full flex-col gap-4 overflow-auto pl-1"
            >
              <Container
                drag-class="cursor-grabbing"
                drag-handle-selector=".task-drag"
                lock-axis="y"
                orientation="vertical"
                @drop="onTaskDrop"
              >
                <Draggable
                  v-for="(task, index) in tasks"
                  :key="task.id"
                  :class="draggingEnabled ? 'task-drag' : 'nomoredragging'"
                  :index="index"
                >
                  <div class="mb-1 flex w-full flex-row items-center justify-between gap-4">
                    <div class="flex w-full flex-row items-center justify-start gap-4">
                      <CheckboxRoot
                        v-model:checked="task.finished"
                        class="bg-elevation-4 bg-elevation-2-hover border-elevation-5 flex h-5 w-5 appearance-none items-center justify-center rounded-[4px] border outline-none"
                        @update:checked="updateCardTasks()"
                      >
                        <CheckboxIndicator class="flex h-full w-full items-center justify-center rounded">
                          <PhCheck
                            weight="bold"
                            class="text-accent-lighter h-4 w-4"
                          />
                        </CheckboxIndicator>
                      </CheckboxRoot>
                      <input
                        v-if="taskEditMode && index === currentlyEditingTaskIndex"
                        v-model="currentlyEditingTaskName"
                        v-focus
                        class="bg-elevation-2 border-accent -mx-1.5 w-full rounded-md border-b-2 border-dotted px-1.5 py-0.5 outline-none"
                        type="text"
                        @blur="updateTask(index)"
                        @keypress.enter="updateTask(index)"
                      >
                      <ClickCounter
                        v-else
                        @double-click="enableTaskEditMode(index, task)"
                      >
                        <span
                          class="text-no-overflow-task w-full"
                        >{{ task.name }}</span>
                      </ClickCounter>
                    </div>
                    <div class="ml-1 flex h-full shrink-0 flex-row items-end gap-1 self-center">
                      <button
                        v-if="!taskEditMode"
                        class="shrink-0"
                        @click="enableTaskEditMode(index, task)"
                      >
                        <PhPencilSimple class="text-dim-2 text-accent-hover h-4 w-4" />
                      </button>
                      <button
                        v-if="taskEditMode && currentlyEditingTaskIndex === index"
                        class="shrink-0"
                        @click="updateTask(index)"
                      >
                        <PhCheck class="text-dim-2 text-accent-hover h-4 w-4" />
                      </button>
                      <button
                        v-if="!(taskEditMode && currentlyEditingTaskIndex === index)"
                        class="shrink-0"
                        @click="deleteTask(index)"
                      >
                        <XMarkIcon class="text-dim-2 text-accent-hover h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Draggable>
              </Container>
            </div>
            <input
              v-if="taskAddMode"
              ref="newTaskInput"
              v-model="newTaskName"
              v-focus
              class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto rounded-md p-1 text-base focus:border-2 focus:border-dotted focus:outline-none"
              maxlength="1000"
              placeholder="Enter a task name..."
              type="text"
              @keypress.enter="createTask"
            >
            <div
              v-if="taskAddMode"
              class="ml-0.5 mt-0.5 flex flex-row gap-4"
            >
              <button
                class="bg-accent text-buttons rounded-md px-4 py-1"
                @click="createTask"
              >
                Add
              </button>
              <button @click="taskAddMode = false; newTaskName = ''">
                Cancel
              </button>
            </div>
            <button
              v-if="!taskAddMode"
              class="bg-elevation-1 bg-elevation-2-hover mr-8 flex h-min w-full cursor-pointer flex-row items-center gap-2 rounded-md py-2 pl-1 pr-2"
              @click="enableTaskAddMode"
            >
              <PlusIcon class="text-accent h-6 w-6" />
              <span>Add Task</span>
            </button>
          </div>
          <h2
            class="mb-2 mt-6 text-lg font-semibold"
          >
            Card Color
          </h2>
          <div class="mb-6 flex flex-row gap-4">
            <button
              class="h-7 w-7 rounded-full bg-pink-600 py-1 pl-1.5 pr-1 hover:bg-pink-700"
              @click="setCardColor(columnID, cardIndex, 'bg-pink-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-pink-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-red-600 py-1 pl-1.5 pr-1 hover:bg-red-700"
              @click="setCardColor(columnID, cardIndex, 'bg-red-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-red-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-orange-600 py-1 pl-1.5 pr-1 hover:bg-orange-700"
              @click="setCardColor(columnID, cardIndex, 'bg-orange-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-orange-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-yellow-600 py-1 pl-1.5 pr-1 hover:bg-yellow-700"
              @click="setCardColor(columnID, cardIndex, 'bg-yellow-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-yellow-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-green-600 py-1 pl-1.5 pr-1 hover:bg-green-700"
              @click="setCardColor(columnID, cardIndex, 'bg-green-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-green-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-teal-600 py-1 pl-1.5 pr-1 hover:bg-teal-700"
              @click="setCardColor(columnID, cardIndex, 'bg-teal-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-teal-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-blue-600 py-1 pl-1.5 pr-1 hover:bg-blue-700"
              @click="setCardColor(columnID, cardIndex, 'bg-blue-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-blue-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="h-7 w-7 rounded-full bg-purple-600 py-1 pl-1.5 pr-1 hover:bg-purple-700"
              @click="setCardColor( columnID, cardIndex, 'bg-purple-600')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-purple-600'"
                class="h-4 w-4"
              />
            </button>
            <button
              class="bg-elevation-2 bg-elevation-3-hover h-7 w-7 rounded-full py-1 pl-1.5 pr-1"
              @click="setCardColor(columnID, cardIndex, 'bg-elevation-2')"
            >
              <CheckIcon
                v-if="selectedColor === 'bg-elevation-2'"
                class="h-4 w-4"
              />
            </button>
            <button
              :class="`h-7 w-7 rounded-full py-1 pl-1.5 pr-1`"
              :style="{'background-color': customColor}"
              @click="setCardColor(columnID, cardIndex, customColor)"
            >
              <CheckIcon
                v-if="isCustomColor"
                :class="['h-4', 'w-4', getContrast(customColor)]"
              />
              <SwatchIcon
                v-else
                :class="['stroke-2', 'h-4', 'w-4', getContrast(customColor)]"
              />
            </button>
            <div
              v-if="isCustomColor"
              class="bg-elevation-2 flex flex-col gap-1 rounded-md p-1"
            >
              <input
                v-model="customColor"
                class="bg-elevation-1 w-20 rounded-md px-2"
                readonly="true"
                type="text"
              >
              <input
                ref="colorInput"
                v-model="customColor"
                class="bg-elevation-2 w-full rounded-md px-2"
                type="color"
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { Card } from "@/types/kanban-types";
import type { Ref } from "vue";

import emitter from "@/utils/emitter"
import { generateUniqueID } from "@/utils/idGenerator";
import { SwatchIcon } from "@heroicons/vue/24/outline";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { PhCalendar, PhCheck, PhPencilSimple } from "@phosphor-icons/vue";
//@ts-ignore
import { Container, Draggable } from 'vue3-smooth-dnd';

const props = defineProps<{
    card: Card | null,
    cardIndexProp: number,
    columnId: string,
}>();

const emit = defineEmits<{
    (e: "closeModal", columnID: string): void,
    (e: "setCardColor", columnID: string, cardIndex: number, color: string): void,
    (e: "setCardDescription", columnID: string, cardIndex: number, description: string): void,
    (e: "setCardDueDate", columnID: string, cardIndex: number, dueDate: Date | null, isCounterRelative: boolean): void,
    (e: "setCardTasks", columnID: string, cardIndex: number, tasks: Array<{finished: boolean, name: string}>): void
    (e: "setCardTitle", columnID: string, cardIndex: number, title: string): void,
}>();

const columnID = ref("");
const cardIndex = ref(0);
const title = ref("");
const description = ref("");
const tasks: Ref<Array<{finished: boolean; id?: string, name: string }>> = ref([]);
const selectedColor = ref("");
const dueDate: Ref<Date | null> = ref(null);
const isDueDateCounterRelative = ref(false);

const isCustomColor = computed(() => selectedColor.value.startsWith('#'));
const customColor = ref("#ffffff");

const titleEditing = ref(false);
const titleInput: Ref<HTMLInputElement | null> = ref(null);

const newTaskName = ref("");
const taskAddMode = ref(false);
const newTaskInput: Ref<HTMLInputElement | null> = ref(null);

const currentlyEditingTaskIndex = ref(-1);
const currentlyEditingTaskName = ref("");
const taskEditMode = ref(false);

const draggingEnabled = ref(true);

const enableTitleEditing = () => {
    emitter.emit("modalPreventClickOutsideClose");
    titleEditing.value = true;
}

const enableTaskAddMode = () => {
    taskAddMode.value = true;
}

const getCheckedTaskNumber = computed(() => {
    return tasks.value.filter(task => task.finished).length || 0;
})

const getTaskPercentage = computed(() => {
    if (!tasks.value || tasks.value.length === 0) return 0;

    return (getCheckedTaskNumber.value / tasks.value.length) * 100;
})

const createTask = () => {
    if (newTaskName.value == null || !(/\S/.test(newTaskName.value))) return;

    tasks.value.push({ finished: false, id: generateUniqueID(), name: newTaskName.value });
    newTaskName.value = "";
    taskAddMode.value = false;

    updateCardTasks();
}

const deleteTask = (index: number) => {
    tasks.value.splice(index, 1);
    updateCardTasks();
}

const onTaskDrop = (dropResult: any) => {
    tasks.value = applyDrag(tasks.value, dropResult);
    updateCardTasks();
}

const enableTaskEditMode = (index: number, task: {finished: boolean, name: string}) => {
    taskEditMode.value = true;
    draggingEnabled.value = false;
    currentlyEditingTaskIndex.value = index;
    currentlyEditingTaskName.value = task.name;
}

const updateTask = (index: number) => {
    const taskNameEmpty = currentlyEditingTaskName.value == null || !(/\S/.test(currentlyEditingTaskName.value));
    if (taskNameEmpty || currentlyEditingTaskIndex.value === -1) return;

    tasks.value[index].name = currentlyEditingTaskName.value;

    currentlyEditingTaskIndex.value = -1;
    currentlyEditingTaskName.value = "";
    taskEditMode.value = false;
    draggingEnabled.value = true;

    updateCardTasks();
}

const updateCardTasks = () => {
    emit("setCardTasks", columnID.value, cardIndex.value, tasks.value);
}

const updateDueDate = () => {
    emit("setCardDueDate", columnID.value, cardIndex.value, dueDate.value, isDueDateCounterRelative.value );
}

const updateDescription = () => {
    emit("setCardDescription", columnID.value, cardIndex.value, description.value);
    emitter.emit("modalEnableClickOutsideClose");
}

const updateTitle = () => {
    emitter.emit("modalEnableClickOutsideClose");

    if (title.value == null || !(/\S/.test(title.value))) return;

    titleEditing.value = false;
    emit("setCardTitle", columnID.value, cardIndex.value, title.value);
}

const setCardColor = (columnID: string, cardIndex: number, color: string) => {
    selectedColor.value = color;
    emit('setCardColor', columnID, cardIndex, color);
}

watch(customColor, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        setCardColor(columnID.value, cardIndex.value, newVal);
    }
});

watch(props, (newVal) => {
    if (newVal) {
        if (!newVal.card) return;

        newTaskName.value = "";

        columnID.value = newVal.columnId;
        cardIndex.value = newVal.cardIndexProp;

        title.value = newVal.card.name;
        description.value = newVal.card.description || "";

        dueDate.value = newVal.card.dueDate || null;
        isDueDateCounterRelative.value = newVal.card.isDueDateCounterRelative || false;

        /**
         * Enforce adding IDs to all card tasks
         * TODO: Potentially remove later on in a version with breaking change to make ID non-optional
        */
        const savedTasks = newVal.card.tasks || [];
        if (savedTasks.length > 0) {
            savedTasks.forEach(task => {
                if (!task.id) {
                    console.log("this should not happen again");
                    task.id = generateUniqueID();
                }
            });
        }
        tasks.value = savedTasks;

        selectedColor.value = newVal.card.color || "bg-elevation-2";
        if (newVal.card.color?.startsWith('#')) {
            customColor.value = newVal.card.color;
        }
    }
})
</script>

<style>
.vc-light {
  /* Base */
  --vc-color: var(--text);
  --vc-bg: var(--bg-primary);
  --vc-border: var(--elevation-1);
  --vc-hover-bg: hsla(211, 25%, 84%, 0.3);
  --vc-focus-ring: 0 0 0 2px rgb(59, 131, 246, 0.4);
  /* Calendar header */
  --vc-header-arrow-color: var(--text-dim-2);
  --vc-header-arrow-hover-bg: var(--elevation-2);
  --vc-header-title-color: var(--accent);
  /* Calendar weekdays */
  --vc-weekday-color: var(--text-dim-3);
  /* Calendar weeknumbers */
  --vc-weeknumber-color: var(--vc-gray-400);
  /* Calendar nav */
  --vc-nav-hover-bg: var(--vc-gray-200);
  --vc-nav-title-color: var(--vc-gray-900);
  --vc-nav-item-hover-box-shadow: none;
  --vc-nav-item-active-color: var(--vc-white);
  --vc-nav-item-active-bg: var(--vc-accent-500);
  --vc-nav-item-active-box-shadow: var(--vc-shadow);
  --vc-nav-item-current-color: var(--vc-accent-600);
  /* Calendar day popover */
  --vc-day-popover-container-color: var(--vc-white);
  --vc-day-popover-container-bg: var(--vc-gray-800);
  --vc-day-popover-container-border: var(--vc-gray-700);
  --vc-day-popover-header-color: var(--vc-gray-700);
  /* Popover content */
  --vc-popover-content-color: var(--vc-gray-900);
  --vc-popover-content-bg: var(--vc-gray-50);
  --vc-popover-content-border: var(--elevation-2);
  /* Time picker */
  --vc-time-picker-border: var(--elevation-1);
  --vc-time-weekday-color: var(--text-dim-3);
  --vc-time-month-color: var(--accent);
  --vc-time-day-color: var(--accent);
  --vc-time-year-color: var(--text-dim-3);
  /* Time select group */
  --vc-time-select-group-bg: var(--elevation-1);
  --vc-time-select-group-border: var(--elevation-2);
  --vc-time-select-group-icon-color: var(--accent);
  /* Base select */
  --vc-select-color: var(--text);
  --vc-select-bg: var(--elevation-1);
  --vc-select-hover-bg: var(--elevation-2);
  /* Calendar day */
  --vc-day-content-hover-bg: var(--elevation-2);
  --vc-day-content-disabled-color: var(--vc-gray-400);
  /* Calendar attributes */
  &.vc-attr,
  & .vc-attr {
    --vc-content-color: var(--vc-accent-600);
    --vc-highlight-outline-bg: var(--vc-white);
    --vc-highlight-outline-border: var(--vc-accent-600);
    --vc-highlight-outline-content-color: var(--vc-accent-700);
    --vc-highlight-light-bg: var(--vc-accent-200);
    --vc-highlight-light-content-color: var(--vc-accent-900);
    --vc-highlight-solid-bg: var(--accent);
    --vc-highlight-solid-content-color: var(--vc-white);
    --vc-dot-bg: var(--vc-accent-600);
    --vc-bar-bg: var(--vc-accent-600);
  }
}
</style>
