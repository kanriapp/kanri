<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, Khusyasy, gitoak -->
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
    center-in-workspace
    @closeModal="
      $emit('closeModal', columnID);
      titleEditing = false;
      taskAddMode = false;
      showCustomColorPopup = false;
      emitter.emit('columnDraggingOn');
    "
  >
    <template #content>
      <div class="flex max-h-[86vh] min-h-[40rem] w-[72rem] max-w-[94vw] flex-col pl-2">
        <div class="mb-4">
          <div class="flex flex-row items-start justify-between gap-12">
            <div
              class="relative -left-8 top-0 flex flex-row items-center gap-2"
            >
              <div @blur="showCustomColorPopup = false">
                <Tooltip direction="top" :label="$t('modals.editCard.tooltip')">
                  <template #trigger>
                    <button
                      class="flex size-7 items-center justify-center rounded-full"
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
                    <h2 class="mb-1 text-lg font-semibold">
                      {{ $t("modals.editCard.colorTitle") }}
                    </h2>
                    <div class="flex w-full flex-row gap-3">
                      <button
                        class="size-7 rounded-full bg-pink-600 py-1 pl-1.5 pr-1 hover:bg-pink-700"
                        @click="setCardColor(columnID, card?.id, 'bg-pink-600')"
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-pink-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-red-600 py-1 pl-1.5 pr-1 hover:bg-red-700"
                        @click="setCardColor(columnID, card?.id, 'bg-red-600')"
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-red-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-orange-600 py-1 pl-1.5 pr-1 hover:bg-orange-700"
                        @click="
                          setCardColor(columnID, card?.id, 'bg-orange-600')
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
                          setCardColor(columnID, card?.id, 'bg-yellow-600')
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
                          setCardColor(columnID, card?.id, 'bg-green-600')
                        "
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-green-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-teal-600 py-1 pl-1.5 pr-1 hover:bg-teal-700"
                        @click="setCardColor(columnID, card?.id, 'bg-teal-600')"
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-teal-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-blue-600 py-1 pl-1.5 pr-1 hover:bg-blue-700"
                        @click="setCardColor(columnID, card?.id, 'bg-blue-600')"
                      >
                        <CheckIcon
                          v-if="selectedColor === 'bg-blue-600'"
                          class="size-4"
                        />
                      </button>
                      <button
                        class="size-7 rounded-full bg-purple-600 py-1 pl-1.5 pr-1 hover:bg-purple-700"
                        @click="
                          setCardColor(columnID, card?.id, 'bg-purple-600')
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
                          setCardColor(columnID, card?.id, 'bg-elevation-2')
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
                        @click="setCardColor(columnID, card?.id, customColor)"
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
                        {{ $t("modals.editCard.colorCustom") }}
                      </h3>
                      <div class="flex w-full flex-row gap-4">
                        <input
                          v-model="customColor"
                          class="w-20"
                          type="color"
                        >
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
                    >{{ $t("modals.editCard.dueDate")
                    }}{{ dateToLocalFormat(dueDate) }}</span
                  >
                  <span v-else>{{ $t("modals.editCard.dateSet") }}</span>
                </button>
              </template>
              <template #footer>
                <div class="w-full px-4 pb-3">
                  <div class="mt-2 flex flex-col gap-2">
                    <div class="mb-2 flex flex-row items-center gap-6">
                      <SwitchRoot
                        v-model:checked="isDueDateCounterRelative"
                        class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                        @update:checked="updateDueDate"
                      >
                        <SwitchThumb
                          class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                        />
                      </SwitchRoot>
                      <p>{{ $t("modals.editCard.countdown") }}</p>
                    </div>

                    <button
                      class="bg-elevation-1 bg-elevation-2-hover flex flex-row items-center justify-center gap-2 rounded-md px-2 py-1"
                      @click="resetDueDate"
                    >
                      <PhTrash class="mt-0.5 size-5" />
                      {{ $t("modals.editCard.dateRemove") }}
                    </button>
                    <button
                      class="bg-accent flex flex-row items-center justify-center gap-2 rounded-md px-2 py-1"
                      @click="isDueDateCompleted = !isDueDateCompleted; markDueDateCompleted()"
                    >
                      <PhCheck v-if="!isDueDateCompleted" class="mt-0.5 size-5" />
                      <PhX v-else class="mt-0.5 size-5" />
                      {{ isDueDateCompleted ? 'Mark Not Completed' : 'Set as Completed' }}
                    </button>
                  </div>
                </div>
              </template>
            </VDatePicker>
          </div>
          <div class="text-dim-2 mt-2 flex flex-col gap-1 text-xs">
            <p v-if="cardCreatedAt">Created: {{ cardCreatedAt }}</p>
            <p v-if="cardCompletedAt">Completed: {{ cardCompletedAt }}</p>
          </div>
        </div>

        <div class="overflow-auto">
          <div class="flex flex-col pr-6">
            <h2 class="text-lg font-semibold">
              {{ $t("modals.editCard.descriptionTitle") }}
            </h2>
            <KanbanDescriptionEditor
              ref="descriptionEditor"
              v-model="description"
              @editorBlurred="updateDescription"
              @requestFiles="addFilesToCardContent"
            />
          </div>
          <div>
            <div class="mb-1 mt-4 flex flex-row items-center gap-2">
              <h2 class="text-lg font-semibold">
                {{ $t("modals.editCard.taskTitle") }}
              </h2>
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
                class="flex max-h-[46vh] min-h-56 w-full flex-col gap-4 overflow-auto pl-1 pr-6"
              >
                <Container
                  drag-class="cursor-grabbing"
                  drag-handle-selector=".task-drag-handle"
                  :animation-duration="120"
                  :drag-begin-delay="0"
                  :get-child-payload="(index: number) => tasks[index]"
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
                      class="mb-2 flex w-full flex-col gap-1.5"
                      @dragover.prevent
                    >
                      <div class="flex w-full flex-row items-start justify-between gap-4">
                        <div class="flex w-full flex-row items-start justify-start gap-3">
                          <div class="task-drag-handle text-dim-3 mt-1 cursor-grab select-none text-xs">
                            ::
                          </div>
                          <CheckboxRoot
                            v-model:checked="task.finished"
                            class="bg-elevation-4 bg-elevation-2-hover border-elevation-5 mt-1 flex size-5 shrink-0 appearance-none items-center justify-center rounded-[4px] border outline-none"
                            @update:checked="(checked) => handleTaskCheckedChange(task, checked)"
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
                          <textarea
                            v-if="
                              taskEditMode && index === currentlyEditingTaskIndex
                            "
                            v-model="currentlyEditingTaskName"
                            v-focus
                            class="bg-elevation-2 border-accent -mx-1.5 min-h-20 w-full resize-y rounded-md border-b-2 border-dotted px-1.5 py-0.5 outline-none"
                            @blur="updateTask(index)"
                            @keydown.ctrl.enter.prevent="updateTask(index)"
                          />
                          <ClickCounter
                            v-else
                            @double-click="enableTaskEditMode(index, task)"
                          >
                            <div class="w-full min-w-0">
                              <div
                                v-for="(line, lineIndex) in taskLines(task.name)"
                                :key="`${taskKey(task, index)}-${lineIndex}`"
                                class="rounded-sm px-1 py-0.5"
                                @drop.prevent="(event) => addDroppedFilesToTaskLine(event, task, lineIndex)"
                              >
                                <span class="block w-full whitespace-pre-wrap break-words">{{ line || " " }}</span>
                                <div
                                  v-if="taskAttachmentsForLine(task, lineIndex).length"
                                  class="mt-1 flex flex-col gap-1"
                                >
                                  <div
                                    v-for="attachment in taskAttachmentsForLine(task, lineIndex)"
                                    :key="attachment.id"
                                    class="bg-elevation-2 border-elevation-3 flex min-h-8 max-w-full items-center gap-2 rounded border px-2 py-1 text-xs"
                                  >
                                    <PhPaperclip class="text-dim-2 size-3.5 shrink-0" />
                                    <button
                                      class="min-w-0 flex-1 truncate text-left"
                                      @click="openTaskAttachment(attachment)"
                                    >
                                      {{ attachmentLabel(attachment) }}
                                    </button>
                                    <button
                                      class="text-dim-2 text-accent-hover shrink-0"
                                      @click="removeTaskAttachment(task, attachment)"
                                    >
                                      <XMarkIcon class="size-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <span class="text-dim-2 mt-0.5 block text-xs">
                                Created: {{ formatTimestamp(task.createdAt) || '-' }}
                                <span v-if="task.completedAt"> | Completed: {{ formatTimestamp(task.completedAt) }}</span>
                              </span>
                            </div>
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
                    </div>
                  </Draggable>
                </Container>
              </div>
              <textarea
                v-if="taskAddMode"
                ref="newTaskInput"
                v-model="newTaskName"
                v-focus
                class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto w-[96%] rounded-md p-1 text-base focus:border-2 focus:border-dotted focus:outline-none"
                maxlength="1000"
                :placeholder="$t('modals.editCard.newTaskPlaceholder')"
                @keydown.enter.exact.prevent="createTask"
              />
              <div v-if="taskAddMode" class="ml-0.5 mt-0.5 flex flex-row gap-4">
                <button
                  class="bg-accent text-buttons rounded-md px-4 py-1"
                  @click="createTask"
                >
                  {{ $t("general.addAction") }}
                </button>
                <button
                  @click="
                    taskAddMode = false;
                    newTaskName = '';
                  "
                >
                  {{ $t("general.cancelAction") }}
                </button>
              </div>
              <button
                v-if="!taskAddMode"
                class="bg-elevation-1 bg-elevation-2-hover mr-8 mt-1 flex h-min w-[96%] cursor-pointer flex-row items-center gap-2 rounded-md py-1 pl-0.5 pr-2"
                @click="enableTaskAddMode"
              >
                <PlusIcon class="text-accent size-6" />
                <span>{{ $t("modals.editCard.taskAdd") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { AttachmentRef, BoardAsset, Card, Task, Tag } from "@/types/kanban-types";
import type { Ref } from "vue";

import { getCurrentTimestamp } from "@/utils/dateTime";
import { applyDrag } from "@/utils/drag-n-drop";
import emitter from "@/utils/emitter";
import { generateUniqueID } from "@/utils/idGenerator";
import { SwatchIcon } from "@heroicons/vue/24/outline";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import {
  PhCalendar,
  PhCheck,
  PhPaperclip,
  PhPencilSimple,
  PhTrash,
  PhX,
} from "@phosphor-icons/vue";
import { vOnClickOutside } from "@vueuse/components";
//@ts-expect-error library has no types
import { Container, Draggable } from "vue3-smooth-dnd";
import { useSettingsStore } from "@/stores/settings";
import { formatFileSize, getAssetUrl, makeAttachmentRef } from "@/utils/attachments";
import { richHtmlToText, sanitizeRichHtml } from "@/utils/richContent";

const props = defineProps<{
  boardAssets: Array<BoardAsset>;
  card: Card | null;
  columnId: string;
  globalTags: Array<Tag>;
}>();

const emit = defineEmits<{
  (e: "closeModal", columnID: string): void;
  (
    e: "setCardColor",
    columnID: string,
    cardId: string | undefined,
    color: string
  ): void;
  (
    e: "setCardDescription",
    columnID: string,
    cardId: string | undefined,
    description: string
  ): void;
  (
    e: "setCardAttachments",
    columnID: string,
    cardId: string | undefined,
    attachments: Array<AttachmentRef>
  ): void;
  (
    e: "setCardDueDate",
    columnID: string,
    cardId: string | undefined,
    dueDate: Date | null,
    isCounterRelative: boolean,
    isCompleted: boolean
  ): void;
  (
    e: "setCardTasks",
    columnID: string,
    cardId: string | undefined,
    tasks: Array<Task>
  ): void;
  (
    e: "setCardTitle",
    columnID: string,
    cardId: string | undefined,
    title: string
  ): void;
  (e: "upsertBoardAsset", asset: BoardAsset): void;
}>();

const { locale } = useI18n();

const columnID = ref("");
const { textarea: titleTextArea, input: title } = useTextareaAutosize();
const description = ref("");
const descriptionEditor = ref<{
  insertAttachment: (attachment: Record<string, string | null>) => void;
  insertImage: (src: string, assetId: string, alt?: string) => void;
} | null>(null);
const cardAttachments: Ref<Array<AttachmentRef>> = ref([]);
const tasks: Ref<Array<Task>> = ref([]);
const cardCreatedAt = ref<string | null>(null);
const selectedColor = ref("");

const dueDate: Ref<Date | null> = ref(null);
const isDueDateCounterRelative = ref(false);
const settingsStore = useSettingsStore();
const isDueDateCompleted = ref(false);
const cardCompletedAt = computed(() => {
  if (!tasks.value || tasks.value.length === 0) return null;
  if (tasks.value.some((task) => !task.finished || !task.completedAt)) return null;

  const completionTimes = tasks.value
    .map((task) => {
      if (!task.completedAt) return Number.NaN;
      return new Date(task.completedAt).getTime();
    })
    .filter((time) => !Number.isNaN(time));

  if (completionTimes.length !== tasks.value.length) return null;

  const latestCompletion = Math.max(...completionTimes);
  return formatTimestamp(new Date(latestCompletion).toISOString());
});

const isCustomColor = computed(() => selectedColor.value.startsWith("#"));
const customColor = ref("#ffffff");
const showCustomColorPopup = ref(false);

const titleEditing = ref(false);

const newTaskName = ref("");
const taskAddMode = ref(false);
const newTaskInput: Ref<HTMLTextAreaElement | null> = ref(null);

const currentlyEditingTaskIndex = ref(-1);
const currentlyEditingTaskName = ref("");
const currentlyEditingTaskLineCount = ref(0);
const taskEditMode = ref(false);

const draggingEnabled = ref(true);
const { ingestFiles, openAsset, pickFiles } = useAttachments();

const enableTitleEditing = () => {
  emitter.emit("modalPreventClickOutsideClose");
  titleEditing.value = true;
};

const enableTaskAddMode = () => {
  taskAddMode.value = true;
};

const getCheckedTaskNumber = computed(() => {
  return tasks.value.filter((task) => task.finished).length || 0;
});

const getTaskPercentage = computed(() => {
  if (!tasks.value || tasks.value.length === 0) return 0;

  return (getCheckedTaskNumber.value / tasks.value.length) * 100;
});

const createTask = () => {
  if (newTaskName.value == null || !/\S/.test(newTaskName.value)) return;

  tasks.value.push({
    attachments: [],
    completedAt: null,
    createdAt: getCurrentTimestamp(),
    description: "",
    dueDate: null,
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
  task: Task
) => {
  taskEditMode.value = true;
  draggingEnabled.value = false;
  currentlyEditingTaskIndex.value = index;
  currentlyEditingTaskName.value = task.name;
  currentlyEditingTaskLineCount.value = taskLines(task.name).length;
};

const updateTask = (index: number) => {
  const taskNameEmpty =
    currentlyEditingTaskName.value == null ||
    !/\S/.test(currentlyEditingTaskName.value);
  if (taskNameEmpty || currentlyEditingTaskIndex.value === -1) return;

  if (tasks.value[index]) {
    tasks.value[index].name = currentlyEditingTaskName.value;
    normalizeTaskAttachmentLines(tasks.value[index], currentlyEditingTaskLineCount.value);
  }

  currentlyEditingTaskIndex.value = -1;
  currentlyEditingTaskName.value = "";
  currentlyEditingTaskLineCount.value = 0;
  taskEditMode.value = false;
  draggingEnabled.value = true;

  updateCardTasks();
};

const handleTaskCheckedChange = (
  task: Task,
  checked: boolean | "indeterminate"
) => {
  const isFinished = checked === true;
  task.finished = isFinished;
  task.completedAt = isFinished ? getCurrentTimestamp() : null;

  updateCardTasks();
};

const updateCardTasks = () => {
  emit("setCardTasks", columnID.value, props.card?.id, tasks.value);
};

const updateCardAttachments = () => {
  emit(
    "setCardAttachments",
    columnID.value,
    props.card?.id,
    cardAttachments.value
  );
};

const addCardAssetsToDescription = async (paths: string[]) => {
  const { assets } = await ingestFiles(props.boardAssets, paths, asset => emit("upsertBoardAsset", asset));
  if (assets.length === 0) return;

  for (const asset of assets) {
    const attachment = makeAttachmentRef(asset.id, asset.kind === "image" ? "inline-image" : "attachment");
    cardAttachments.value = [...cardAttachments.value, attachment];

    if (asset.kind === "image") {
      descriptionEditor.value?.insertImage(await getAssetUrl(asset), asset.id, asset.name);
    } else {
      descriptionEditor.value?.insertAttachment({
        assetId: asset.id,
        attachmentId: attachment.id,
        href: "#",
        kind: asset.kind,
        label: `${asset.name} (${formatFileSize(asset.size)})`,
      });
    }
  }

  syncCardAttachmentsFromDescription();
  updateCardAttachments();
  updateDescription();
};

const addFilesToCardContent = async () => {
  const paths = await pickFiles();
  if (paths.length > 0) await addCardAssetsToDescription(paths);
};

const extractDescriptionAttachmentRefs = () => {
  if (typeof window === "undefined") return cardAttachments.value;

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizeRichHtml(description.value), "text/html");
  const refs: AttachmentRef[] = [];

  doc.querySelectorAll("[data-asset-id]").forEach((node) => {
    const assetId = node.getAttribute("data-asset-id");
    if (!assetId) return;
    const existing = cardAttachments.value.find(item =>
      item.id === node.getAttribute("data-attachment-id") ||
      (item.assetId === assetId && item.role === (node.tagName.toLowerCase() === "img" ? "inline-image" : "attachment"))
    );
    refs.push({
      ...(existing || makeAttachmentRef(assetId, node.tagName.toLowerCase() === "img" ? "inline-image" : "attachment")),
      assetId,
      role: node.tagName.toLowerCase() === "img" ? "inline-image" : "attachment",
    });
  });

  return refs.filter((ref, index, all) => all.findIndex(item => item.id === ref.id) === index);
};

const taskKey = (task: Task, index: number) => {
  return task.id || `task-${index}`;
};

const syncCardAttachmentsFromDescription = () => {
  cardAttachments.value = extractDescriptionAttachmentRefs();
};

const taskLines = (value: string | null | undefined) => {
  const lines = (value || "").split("\n");
  return lines.length > 0 ? lines : [""];
};

const taskAttachmentsForLine = (task: Task, line: number) => {
  return (task.attachments || []).filter(attachment => (attachment.line || 0) === line);
};

const normalizeTaskAttachmentLines = (task: Task, previousLineCount = taskLines(task.name).length) => {
  const lineCount = Math.max(1, taskLines(task.name).length);
  task.attachments = (task.attachments || []).map(attachment => ({
    ...attachment,
    line: Math.min(Math.max(0, attachment.line || 0), lineCount - 1),
  }));
  void previousLineCount;
};

const addFilesToTaskLine = async (task: Task, paths: string[], line: number) => {
  const { assets } = await ingestFiles(props.boardAssets, paths, asset => emit("upsertBoardAsset", asset));
  if (assets.length === 0) return;
  task.attachments = [
    ...(task.attachments || []),
    ...assets.map((asset) => ({
      ...makeAttachmentRef(asset.id),
      line: Math.min(Math.max(0, line), Math.max(0, taskLines(task.name).length - 1)),
    })),
  ];
  updateCardTasks();
};

const addDroppedFilesToTaskLine = async (event: DragEvent, task: Task, line: number) => {
  const paths = Array.from(event.dataTransfer?.files || [])
    .map(file => ("path" in file ? String((file as File & { path?: string }).path || "") : ""))
    .filter(Boolean);
  if (paths.length > 0) await addFilesToTaskLine(task, paths, line);
};

const removeTaskAttachment = (task: Task, attachment: AttachmentRef) => {
  task.attachments = (task.attachments || []).filter(item => item.id !== attachment.id);
  updateCardTasks();
};

const taskAttachmentAsset = (attachment: AttachmentRef) => {
  return props.boardAssets.find(asset => asset.id === attachment.assetId) || null;
};

const attachmentLabel = (attachment: AttachmentRef) => {
  const asset = taskAttachmentAsset(attachment);
  return asset ? `${asset.name} (${formatFileSize(asset.size)})` : "Missing attachment";
};

const openTaskAttachment = async (attachment: AttachmentRef) => {
  const asset = taskAttachmentAsset(attachment);
  if (asset) await openAsset(asset);
};

const mergeLegacyTaskDetails = (task: Task) => {
  if (!task.description) return;
  const detailsText = richHtmlToText(task.description);
  if (!detailsText) {
    task.description = "";
    return;
  }

  if (!task.name.includes(detailsText)) {
    task.name = `${task.name}${task.name.trim() ? "\n\n" : ""}${detailsText}`;
  }
  task.description = "";
};

const appendLegacyCardAttachmentsToDescription = async () => {
  const represented = new Set(extractDescriptionAttachmentRefs().map(ref => ref.assetId));
  const missing = cardAttachments.value.filter(attachment => !represented.has(attachment.assetId));
  if (missing.length === 0) return;

  for (const attachment of missing) {
    const asset = props.boardAssets.find(item => item.id === attachment.assetId);
    if (!asset) continue;
    if (asset.kind === "image") {
      descriptionEditor.value?.insertImage(await getAssetUrl(asset), asset.id, asset.name);
    } else {
      descriptionEditor.value?.insertAttachment({
        assetId: asset.id,
        attachmentId: attachment.id,
        href: "#",
        kind: asset.kind,
        label: `${asset.name} (${formatFileSize(asset.size)})`,
      });
    }
  }
  syncCardAttachmentsFromDescription();
  updateCardAttachments();
  updateDescription();
};

const resetDueDate = () => {
  dueDate.value = null;
  emit(
    "setCardDueDate",
    columnID.value,
    props.card?.id,
    null,
    isDueDateCounterRelative.value,
    false
  );
};

const markDueDateCompleted = () => {
  emit(
    "setCardDueDate",
    columnID.value,
    props.card?.id,
    dueDate.value,
    isDueDateCounterRelative.value,
    isDueDateCompleted.value
  );
};

const updateDueDate = () => {
  emit(
    "setCardDueDate",
    columnID.value,
    props.card?.id,
    dueDate.value,
    isDueDateCounterRelative.value,
    isDueDateCompleted.value
  );
};

const updateDescription = () => {
  description.value = sanitizeRichHtml(description.value);
  syncCardAttachmentsFromDescription();
  updateCardAttachments();
  emit("setCardDescription", columnID.value, props.card?.id, description.value);
  emitter.emit("modalEnableClickOutsideClose");
};

const updateTitle = () => {
  emitter.emit("modalEnableClickOutsideClose");

  if (title.value == null || !/\S/.test(title.value)) return;

  titleEditing.value = false;
  emit("setCardTitle", columnID.value, props.card?.id, title.value);
};

const setCardColor = (
  columnID: string,
  cardId: string | undefined,
  color: string
) => {
  selectedColor.value = color;
  emit("setCardColor", columnID, props.card?.id, color);
};

const dateToLocalFormat = (date: Date | string | null | undefined) => {
  if (!date) return "";
  const jsLocaleIdentifier = locale.value.replace("_", "-")

  if (typeof date === "string") {
    return new Date(date).toLocaleDateString(jsLocaleIdentifier);
  }
  return date.toLocaleDateString(jsLocaleIdentifier);
};

const formatTimestamp = (value: Date | string | null | undefined) => {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);

  const jsLocaleIdentifier = locale.value.replace("_", "-");
  return parsed.toLocaleString(jsLocaleIdentifier);
};

watch(customColor, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    setCardColor(columnID.value, props.card?.id, newVal);
  }
});

watch(props, (newVal) => {
  if (newVal) {
    if (!newVal.card) return;

    newTaskName.value = "";

    columnID.value = newVal.columnId;
    cardCreatedAt.value = formatTimestamp(newVal.card.createdAt);

    title.value = newVal.card.name;
    description.value = newVal.card.description || "";
    cardAttachments.value = newVal.card.attachments || [];

    //@ts-expect-error TODO: improve due date handling/types
    dueDate.value = newVal.card.dueDate || null;
    isDueDateCounterRelative.value =
      newVal.card.isDueDateCounterRelative !== undefined
        ? newVal.card.isDueDateCounterRelative
        : settingsStore.defaultRelativeDueDatesEnabled;
    isDueDateCompleted.value = newVal.card.isDueDateCompleted || false;

    /**
     * Enforce adding IDs to all card tasks
     * TODO: Potentially remove later on in a version with breaking change to make ID non-optional
     */
    const savedTasks = newVal.card.tasks || [];
    if (savedTasks.length > 0) {
      savedTasks.forEach((task) => {
        if (!task.id) {
          task.id = generateUniqueID();
        }
        if (!task.attachments) {
          task.attachments = [];
        }
        if (task.description == null) {
          task.description = "";
        }
        mergeLegacyTaskDetails(task);
        normalizeTaskAttachmentLines(task);
      });
    }
    tasks.value = savedTasks;
    void nextTick(() => appendLegacyCardAttachmentsToDescription());

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
