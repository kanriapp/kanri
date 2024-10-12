<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, Khusyasy -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!--
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<template>
  <Modal
    :blur-background="false"
    @closeModal="
      $emit('closeModal', columnID);
      titleEditing = false;
      taskAddMode = false;
      showCustomColorPopup = false;
      emitter.emit('columnDraggingOn');
    "
  >
    <template #content>
      <div class="flex h-[40rem] w-[36rem] flex-col pl-2">
        <div class="mb-4">
          <div class="flex flex-row items-start justify-between gap-12">
            <div
              class="relative -left-8 top-0 flex flex-row items-center gap-2"
            >
              <div @blur="showCustomColorPopup = false">
                <Tooltip direction="top">
                  <template #trigger>
                    <button
                      class="size-6 rounded-full py-1 pl-[0.3rem] pr-1"
                      :class="[isCustomColor ? '' : selectedColor]"
                      :style="{
                        'background-color': isCustomColor ? customColor : '',
                      }"
                      @click="showCustomColorPopup = !showCustomColorPopup"
                    >
                      <SwatchIcon
                        :class="[
                          'stroke-2',
                          'size-3.5',
                          isCustomColor ? getContrast(customColor) : '',
                        ]"
                      />
                    </button>
                  </template>

                  <template #content> Set card color </template>
                </Tooltip>
                <div
                  v-if="showCustomColorPopup"
                  v-on-click-outside="() => (showCustomColorPopup = false)"
                >
                  <div
                    class="border-b-bg-primary absolute left-0 top-4 z-10 size-0 border-x-[12px] border-b-[20px] border-x-transparent"
                    @click="showCustomColorPopup = false"
                  />
                  <div
                    class="bg-primary border-elevation-1 absolute -left-4 top-8 z-20 flex flex-col gap-1 rounded-md border p-3"
                  >
                    <h2 class="mb-1 text-lg font-semibold">Card Color</h2>
                    <div class="flex w-full flex-row gap-3">
                      <button
                        class="size-7 rounded-full bg-pink-600 py-1 pl-1.5 pr-1 hover:bg-pink-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-pink-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-pink-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-red-600 py-1 pl-1.5 pr-1 hover:bg-red-700"
                        @click="setCardColor(columnID, cardIndex, 'bg-red-600')"
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-red-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-orange-600 py-1 pl-1.5 pr-1 hover:bg-orange-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-orange-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-orange-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-yellow-600 py-1 pl-1.5 pr-1 hover:bg-yellow-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-yellow-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-yellow-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-green-600 py-1 pl-1.5 pr-1 hover:bg-green-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-green-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-green-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-teal-600 py-1 pl-1.5 pr-1 hover:bg-teal-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-teal-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-teal-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-blue-600 py-1 pl-1.5 pr-1 hover:bg-blue-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-blue-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-blue-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-purple-600 py-1 pl-1.5 pr-1 hover:bg-purple-700"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-purple-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-purple-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="bg-elevation-2 bg-elevation-3-hover size-7 rounded-full py-1 pl-1.5 pr-1"
                        @click="
                          setCardColor(columnID, cardIndex, 'bg-elevation-2')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-elevation-2'"
                          class="size-4"
                        />
                      </button>
                      <button
                        :class="`h-7 w-7 rounded-full py-1 pl-1.5 pr-1`"
                        :style="{ 'background-color': customColor }"
                        @click="setCardColor(columnID, cardIndex, customColor)"
                      >
                        <CheckIcon
                          v-if="isCustomColor"
                          :class="['h-4', 'w-4', getContrast(customColor)]"
                        />
                        <SwatchIcon
                          v-else
                          :class="[
                            'stroke-2',
                            'h-4',
                            'w-4',
                            getContrast(customColor),
                          ]"
                        />
                      </button>
                    </div>
                    <div v-if="isCustomColor">
                      <h3 class="mb-1 mt-2 font-semibold">
                        Select a custom color:
                      </h3>
                      <div class="flex w-full flex-row gap-4">
                        <input
                          v-model="customColor"
                          class="w-20"
                          type="color"
                        />
                        <HexColorInput v-model="customColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1
                v-if="!titleEditing"
                :v-model="title"
                class="text-no-overflow pointer-events-auto min-w-[64px] max-w-[475px] pr-5 text-2xl font-bold"
                @click="enableTitleEditing()"
              >
                {{ title }}
              </h1>
              <textarea
                v-if="titleEditing"
                ref="titleTextArea"
                v-model="title"
                v-focus
                class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto w-[450px] text-xl focus:border-2 focus:border-dotted focus:outline-none"
                maxlength="1000"
                type="text"
                @blur="updateTitle"
                @keypress.enter="updateTitle"
              />
            </div>
            <XMarkIcon
              class="text-accent-hover size-6 shrink-0 cursor-pointer"
              @click="
                $emit('closeModal', columnID);
                titleEditing = false;
                taskAddMode = false;
                showCustomColorPopup = false;
                emitter.emit('columnDraggingOn');
              "
            />
          </div>
          <div class="flex flex-row items-center gap-2">
            <VDatePicker
              v-model="dueDate"
              mode="dateTime"
              is24hr
              @update:modelValue="updateDueDate"
            >
              <template #default="{ togglePopover }">
                <button
                  class="bg-elevation-2 bg-elevation-3-hover mt-1 flex items-center justify-center gap-2 rounded-md px-2 py-1"
                  @click="() => togglePopover()"
                >
                  <PhCalendar class="size-5" />
                  <span v-if="dueDate"
                    >Due: {{ dueDate.toLocaleDateString() }}</span
                  >
                  <span v-else>Set due date</span>
                </button>
              </template>
              <template #footer>
                <div class="w-full px-4 pb-3">
                  <div class="mt-3 flex flex-col gap-4">
                    <div class="flex flex-row items-center gap-4">
                      <SwitchRoot
                        v-model:checked="isDueDateCounterRelative"
                        class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                        @update:checked="updateDueDate"
                      >
                        <SwitchThumb
                          class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                        />
                      </SwitchRoot>
                      <p>Relative countdown</p>
                    </div>
                    <button
                      class="bg-elevation-1 bg-elevation-2-hover flex flex-row items-center justify-center gap-2 rounded-md px-2 py-1"
                      @click="resetDueDate"
                    >
                      <PhTrash class="mt-0.5 size-5" />
                      Remove due date
                    </button>
                  </div>
                </div>
              </template>
            </VDatePicker>
          </div>
        </div>

        <div class="overflow-auto">
          <div class="flex flex-col pr-6">
            <h2 class="text-lg font-semibold">Card Description</h2>
            <KanbanDescriptionEditor
              v-model="description"
              @editorBlurred="updateDescription"
            />
          </div>
          <div>
            <div class="mb-1 mt-4 flex flex-row items-center gap-2">
              <h2 class="text-lg font-semibold">Tasks</h2>
              <span v-if="tasks.length !== 0" class="text-dim-1 text-sm"
                >({{ getCheckedTaskNumber }}/{{ tasks.length }})</span
              >
            </div>
            <ProgressRoot
              v-if="tasks"
              v-model="getTaskPercentage"
              class="bg-elevation-2 relative mb-4 h-2 w-[96%] overflow-hidden rounded-full"
              style="transform: translateZ(0)"
            >
              <ProgressIndicator
                class="ease-[cubic-bezier(0.65, 0, 0.35, 1)] bg-accent-no-hover size-full rounded-full transition-transform duration-[660ms]"
                :style="`transform: translateX(-${100 - getTaskPercentage}%)`"
              />
            </ProgressRoot>
            <div class="flex w-full flex-col gap-1">
              <div
                v-if="tasks && tasks.length !== 0"
                class="flex max-h-[148px] w-full flex-col gap-4 overflow-auto pl-1 pr-6"
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
                    <div
                      class="mb-1 flex w-full flex-row items-center justify-between gap-4"
                    >
                      <div
                        class="flex w-full flex-row items-center justify-start gap-4"
                      >
                        <CheckboxRoot
                          v-model:checked="task.finished"
                          class="bg-elevation-4 bg-elevation-2-hover border-elevation-5 flex size-5 shrink-0 appearance-none items-center justify-center rounded-[4px] border outline-none"
                          @update:checked="updateCardTasks()"
                        >
                          <CheckboxIndicator
                            class="flex size-full items-center justify-center rounded"
                          >
                            <PhCheck
                              weight="bold"
                              class="text-accent-lighter size-4"
                            />
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        <input
                          v-if="
                            taskEditMode && index === currentlyEditingTaskIndex
                          "
                          v-model="currentlyEditingTaskName"
                          v-focus
                          class="bg-elevation-2 border-accent -mx-1.5 w-full rounded-md border-b-2 border-dotted px-1.5 py-0.5 outline-none"
                          type="text"
                          @blur="updateTask(index)"
                          @keypress.enter="updateTask(index)"
                        />
                        <ClickCounter
                          v-else
                          @double-click="enableTaskEditMode(index, task)"
                        >
                          <span class="text-no-overflow-task w-full">{{
                            task.name
                          }}</span>
                        </ClickCounter>
                      </div>
                      <div
                        class="ml-1 flex h-full shrink-0 flex-row items-end gap-1 self-center"
                      >
                        <button
                          v-if="!taskEditMode"
                          class="shrink-0"
                          @click="enableTaskEditMode(index, task)"
                        >
                          <PhPencilSimple
                            class="text-dim-2 text-accent-hover size-4"
                          />
                        </button>
                        <button
                          v-if="
                            taskEditMode && currentlyEditingTaskIndex === index
                          "
                          class="shrink-0"
                          @click="updateTask(index)"
                        >
                          <PhCheck
                            class="text-dim-2 text-accent-hover size-4"
                          />
                        </button>
                        <button
                          v-if="
                            !(
                              taskEditMode &&
                              currentlyEditingTaskIndex === index
                            )
                          "
                          class="shrink-0"
                          @click="deleteTask(index)"
                        >
                          <XMarkIcon
                            class="text-dim-2 text-accent-hover size-4"
                          />
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
                class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto w-[96%] rounded-md p-1 text-base focus:border-2 focus:border-dotted focus:outline-none"
                maxlength="1000"
                placeholder="Enter a task name..."
                type="text"
                @keypress.enter="createTask"
              />
              <div v-if="taskAddMode" class="ml-0.5 mt-0.5 flex flex-row gap-4">
                <button
                  class="bg-accent text-buttons rounded-md px-4 py-1"
                  @click="createTask"
                >
                  Add
                </button>
                <button
                  @click="
                    taskAddMode = false;
                    newTaskName = '';
                  "
                >
                  Cancel
                </button>
              </div>
              <button
                v-if="!taskAddMode"
                class="bg-elevation-1 bg-elevation-2-hover mr-8 mt-1 flex h-min w-[96%] cursor-pointer flex-row items-center gap-2 rounded-md py-1 pl-0.5 pr-2"
                @click="enableTaskAddMode"
              >
                <PlusIcon class="text-accent size-6" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
          <div class="mt-4 flex flex-col pr-6">
            <h2 class="text-lg font-semibold">Tags</h2>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="filteredItems"
              placeholder="Add tag..."
              @tags-changed="updateTags"
              @before-adding-tag="beforeTagAdd"
            />
            <button
              class="bg-elevation-3 mt-2 w-fit rounded-md px-2 py-0.5 text-sm"
              @click="closeModalAndOpenTagEdit"
            >
              Edit Global Tags
            </button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { Card, Task, Tag } from "@/types/kanban-types";
import type { Ref } from "vue";

import emitter from "@/utils/emitter";
import { generateUniqueID } from "@/utils/idGenerator";
import { SwatchIcon } from "@heroicons/vue/24/outline";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import {
  PhCalendar,
  PhCheck,
  PhPencilSimple,
  PhTrash,
} from "@phosphor-icons/vue";
import { vOnClickOutside } from "@vueuse/components";
//@ts-expect-error library has no types
import { Container, Draggable } from "vue3-smooth-dnd";
//@ts-expect-error library has no types
import { VueTagsInput } from "@vojtechlanka/vue-tags-input";

const props = defineProps<{
  card: Card | null;
  cardIndexProp: number;
  columnId: string;
  globalTags: Array<Tag>;
}>();

const emit = defineEmits<{
  (e: "closeModal", columnID: string): void;
  (e: "setCardColor", columnID: string, cardIndex: number, color: string): void;
  (
    e: "setCardDescription",
    columnID: string,
    cardIndex: number,
    description: string
  ): void;
  (
    e: "setCardDueDate",
    columnID: string,
    cardIndex: number,
    dueDate: Date | null,
    isCounterRelative: boolean
  ): void;
  (
    e: "setCardTags",
    columnID: string,
    cardIndex: number,
    tags: Array<Tag>
  ): void;
  (
    e: "setCardTasks",
    columnID: string,
    cardIndex: number,
    tasks: Array<Task>
  ): void;
  (e: "setCardTitle", columnID: string, cardIndex: number, title: string): void;
  (e: "addGlobalTag", tag: Tag): void;
  (e: "openTagEdit"): void;
}>();

const columnID = ref("");
const cardIndex = ref(0);
const { textarea: titleTextArea, input: title } = useTextareaAutosize();
const description = ref("");
const tasks: Ref<Array<{ finished: boolean; id?: string; name: string }>> = ref(
  []
);
const selectedColor = ref("");

const dueDate: Ref<Date | null> = ref(null);
const isDueDateCounterRelative = ref(false);

const tag = ref("");
const tags: Ref<Array<Tag>> = ref([]);
const autocompleteItems: Ref<Array<Tag>> = ref([]);

const isCustomColor = computed(() => selectedColor.value.startsWith("#"));
const customColor = ref("#ffffff");
const showCustomColorPopup = ref(false);

const titleEditing = ref(false);

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
};

const enableTaskAddMode = () => {
  taskAddMode.value = true;
};

const filteredItems = computed(() => {
  const currentInput = tag.value.trim().toLowerCase();
  return autocompleteItems.value.filter((item) =>
    item.text.toLowerCase().includes(currentInput)
  );
});

const getCheckedTaskNumber = computed(() => {
  return tasks.value.filter((task) => task.finished).length || 0;
});

const getTaskPercentage = computed(() => {
  if (!tasks.value || tasks.value.length === 0) return 0;

  return (getCheckedTaskNumber.value / tasks.value.length) * 100;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const beforeTagAdd = ({ tag, addTag }: any) => {
  // check if autocomplete items have a tag with the same name
  const existingTag = autocompleteItems.value.find(
    (item) => item.text === tag.text
  );
  if (!existingTag) {
    tag.id = generateUniqueID();
  }

  addTag();

  emit("addGlobalTag", tag);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateTags = (newTags: any) => {
  tags.value = newTags;

  emit("setCardTags", columnID.value, cardIndex.value, tags.value);
};

const closeModalAndOpenTagEdit = () => {
  emit("closeModal", columnID.value);
  titleEditing.value = false;
  taskAddMode.value = false;
  showCustomColorPopup.value = false;

  nextTick(() => {
    emit("openTagEdit");
  });
};

const createTask = () => {
  if (newTaskName.value == null || !/\S/.test(newTaskName.value)) return;

  tasks.value.push({
    finished: false,
    id: generateUniqueID(),
    name: newTaskName.value,
  });
  newTaskName.value = "";
  taskAddMode.value = false;

  updateCardTasks();
};

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1);
  updateCardTasks();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onTaskDrop = (dropResult: any) => {
  tasks.value = applyDrag(tasks.value, dropResult);
  updateCardTasks();
};

const enableTaskEditMode = (
  index: number,
  task: { finished: boolean; name: string }
) => {
  taskEditMode.value = true;
  draggingEnabled.value = false;
  currentlyEditingTaskIndex.value = index;
  currentlyEditingTaskName.value = task.name;
};

const updateTask = (index: number) => {
  const taskNameEmpty =
    currentlyEditingTaskName.value == null ||
    !/\S/.test(currentlyEditingTaskName.value);
  if (taskNameEmpty || currentlyEditingTaskIndex.value === -1) return;

  tasks.value[index].name = currentlyEditingTaskName.value;

  currentlyEditingTaskIndex.value = -1;
  currentlyEditingTaskName.value = "";
  taskEditMode.value = false;
  draggingEnabled.value = true;

  updateCardTasks();
};

const updateCardTasks = () => {
  emit("setCardTasks", columnID.value, cardIndex.value, tasks.value);
};

const resetDueDate = () => {
  dueDate.value = null;
  emit(
    "setCardDueDate",
    columnID.value,
    cardIndex.value,
    null,
    isDueDateCounterRelative.value
  );
};

const updateDueDate = () => {
  emit(
    "setCardDueDate",
    columnID.value,
    cardIndex.value,
    dueDate.value,
    isDueDateCounterRelative.value
  );
};

const updateDescription = () => {
  emit(
    "setCardDescription",
    columnID.value,
    cardIndex.value,
    description.value
  );
  emitter.emit("modalEnableClickOutsideClose");
};

const updateTitle = () => {
  emitter.emit("modalEnableClickOutsideClose");

  if (title.value == null || !/\S/.test(title.value)) return;

  titleEditing.value = false;
  emit("setCardTitle", columnID.value, cardIndex.value, title.value);
};

const setCardColor = (columnID: string, cardIndex: number, color: string) => {
  selectedColor.value = color;
  emit("setCardColor", columnID, cardIndex, color);
};

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
    isDueDateCounterRelative.value =
      newVal.card.isDueDateCounterRelative || false;

    tags.value = newVal.card.tags || [];
    tag.value = "";
    autocompleteItems.value = newVal.globalTags;

    /**
     * Enforce adding IDs to all card tasks
     * TODO: Potentially remove later on in a version with breaking change to make ID non-optional
     */
    const savedTasks = newVal.card.tasks || [];
    if (savedTasks.length > 0) {
      savedTasks.forEach((task) => {
        if (!task.id) {
          console.log("this should not happen again");
          task.id = generateUniqueID();
        }
      });
    }
    tasks.value = savedTasks;

    selectedColor.value = newVal.card.color || "bg-elevation-2";
    if (newVal.card.color?.startsWith("#")) {
      customColor.value = newVal.card.color;
    }
  }
});
</script>

<style>
.v-popper__popper {
  z-index: 9999999999 !important;
}

.vue-tags-input {
  background-color: var(--elevation-1) !important;
  max-width: none !important;
}

.vue-tags-input .ti-new-tag-input {
  background: transparent;
  color: var(--text-dim-1);
}

.vue-tags-input .ti-input {
  padding: 8px 4px !important;
  background: var(--elevation-1);

  border: 1px solid var(--elevation-3) !important;
  border-radius: 8px;
}

.vue-tags-input ::-webkit-input-placeholder {
  color: var(--text-dim-3);
}

.vue-tags-input ::-moz-placeholder {
  color: var(--text-dim-3);
}

.vue-tags-input :-ms-input-placeholder {
  color: var(--text-dim-3);
}

.vue-tags-input :-moz-placeholder {
  color: var(--text-dim-3);
}

.vue-tags-input .ti-autocomplete {
  background: var(--elevation-2);
  border: 1px solid var(--elevation-3);
  border-top: none;
  border-radius: 0 0 8px 8px;

  z-index: 9999999999 !important;
  overflow: visible;

  position: unset !important;
}

.vue-tags-input .ti-tag {
  position: relative;
  background: var(--elevation-3);
}

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
    --vc-highlight-outline-border: var(--accent);
    --vc-highlight-outline-content-color: var(--vc-accent-700);
    --vc-highlight-light-bg: var(--vc-accent-200);
    --vc-highlight-light-content-color: var(--vc-accent-900);
    --vc-highlight-solid-bg: var(--accent);
    --vc-highlight-solid-content-color: var(--vc-white);
    --vc-dot-bg: var(--accent);
    --vc-bar-bg: var(--accent);
  }
}

.vc-day.is-today .vc-day-content {
  border: 1.5px solid var(--accent);
  border-radius: 100%;
}
</style>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

input[type="color"] {
  -webkit-appearance: none;
  appearance: none;
  border-radius: 8px;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 8px;
}
input[type="color"]::-webkit-color-swatch {
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--text);
}
</style>
