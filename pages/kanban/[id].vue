<template>
  <div>
    <ModalCustomBackground
      v-show="showCustomBgModal"
      v-if="bgImageLoaded"
      :background="bgCustom"
      :bg-blur-prop="bgBlur"
      :bg-brightness-prop="bgBrightness"
      @closeModal="showCustomBgModal = false"
      @setBackground="setBackgroundImage"
      @resetBackground="resetBackground"
      @setBlur="setBlur"
      @setBrightness="setBrightness"
    />
    <ModalKanban
      v-show="kanbanModalVisible"
      ref="kanbanModal"
      @setCardTitle="setCardTitle"
      @setCardDescription="setCardDescription"
      @closeModal="closeKanbanModal"
    />
    <div class="absolute top-8 z-50 ml-8">
      <h1
        v-if="!boardTitleEditing"
        class="mb-2 rounded-md bg-transparent py-1 pr-8 text-4xl font-bold"
        @click="enableBoardTitleEditing()"
      >
        {{ board.title }}
      </h1>
      <input
        v-if="boardTitleEditing"
        ref="boardTitleInput"
        v-model="board.title"
        type="text"
        maxlength="500"
        class="bg-elevation-2 border-accent text-no-overflow mb-2 mr-2 h-12 w-min rounded-sm border-2 border-dotted px-2 text-4xl outline-none"
        @blur="
          boardTitleEditing = false;
          updateStorage();
        "
        @keypress.enter="
          boardTitleEditing = false;
          updateStorage();
        "
      >
      <button
        class="bg-elevation-1 bg-elevation-2-hover flex flex-row gap-1 rounded-md px-4 py-1"
        @click="showCustomBgModal = true"
      >
        <PhotoIcon class="h-6 w-6" />
        <span>Change Background</span>
      </button>
    </div>
    <div
      id="kanban-cols-container"
      class="custom-scrollbar-horizontal bg-custom flex max-h-screen flex-col overflow-y-hidden"
      :style="cssVars"
    >
      <div class="bg-effect-overlay h-full w-max min-w-full pt-[7.5rem]">
        <div class="z-50 pl-8">
          <div class="pt-4">
            <Container
              group-name="columns"
              :orientation="'horizontal'"
              :non-drag-area-selector="'nodrag'"
              drag-handle-selector=".dragging-handle"
              class="flex-row gap-4"
              @drop="onDrop"
            >
              <Draggable
                v-for="column in board.columns"
                :key="column.id"
              >
                <KanbanColumn
                  :id="column.id"
                  :ref="(el) => saveColumnRef(el, column.id)"
                  :title="column.title"
                  :class="draggingEnabled ? 'dragging-handle' : 'nomoredragging'"
                  :cards-list="column.cards"
                  @updateStorage="updateColumnProperties"
                  @removeColumn="removeColumn"
                  @disableDragging="draggingEnabled = false"
                  @enableDragging="draggingEnabled = true"
                  @openKanbanModal="openKanbanModal"
                />
              </Draggable>
              <div class="pr-8">
                <div
                  class="nodrag bg-elevation-1 bg-elevation-2-hover mr-8 flex h-min cursor-pointer flex-row items-center gap-2 rounded-md p-2"
                  @click="addColumn()"
                >
                  <PlusIcon class="text-accent h-6 w-6" />
                  <span :class="board.columns.length === 0 ? '' : 'hidden'">Add Column</span>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { useTauriStore } from "@/stores/tauriStore";
import { applyDrag } from "@/utils/drag-n-drop";
import { generateUniqueID } from "@/utils/idGenerator";
import type { Board, Card, Column } from "@/types/kanban-types";

import { convertFileSrc } from '@tauri-apps/api/tauri';

import { default as KanbanColumn } from "@/components/kanban/Column.vue";
import { default as KanbanModal } from "@/components/modal/Kanban.vue";
import { Ref } from "vue";

//@ts-ignore
import { Container, Draggable } from "vue3-smooth-dnd";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { PhotoIcon } from "@heroicons/vue/24/outline";

const store = useTauriStore().store;
const route = useRoute();

const boards: Ref<Array<Board>> = ref([]);
const board: Ref<Board> = ref({ id: "123", title: "", columns: [] });
const draggingEnabled = ref(true);

const boardTitleEditing = ref(false);
const boardTitleInput: Ref<HTMLInputElement | null> = ref(null);

const columnCardAddMode = ref(false);
const columnTitleEditing = ref(false);
const columnEditIndex = ref(0);

const bgCustom = ref("");
const bgCustomNoResolution = ref("");
const showCustomBgModal = ref(false);
const bgImageLoaded = ref(false);
const bgBlur = ref("8px");
const bgBrightness = ref("100%");

const colRefs: { [key: string]: InstanceType<typeof KanbanColumn>} = reactive({});
const kanbanModalVisible = ref(false);
const kanbanModal = ref<InstanceType<typeof KanbanModal> | null>(null);

const cssVars = computed(() => {
    return {
        "--bg-custom-image": `url("${bgCustom.value}")`,
        "--blur-intensity": bgBlur.value,
        "--bg-brightness": bgBrightness.value
    }
})

const saveColumnRef = (ref: any, columnId: String) => {
    colRefs[columnId.toString()] = ref;
}

const setCardTitle = (columnId: string, cardId: number, title: string) => {
    colRefs[columnId].setCardTitle(cardId, title);
}

const setCardDescription = (columnId: string, cardId: number, description: string) => {
    colRefs[columnId].setCardDescription(cardId, description);
}

const openKanbanModal = (columnId: string, cardIndex: number, el: Card) => {
    kanbanModalVisible.value = true;
    draggingEnabled.value = false;

    if (kanbanModal.value == null) return;
    kanbanModal.value.initModal(columnId, cardIndex, el.name, el.description);
}

const closeKanbanModal = (columnId: string) => {
    kanbanModalVisible.value = false;
    draggingEnabled.value = true;
    colRefs[columnId].enableDragging();
}

const setBackgroundImage = (img: string) => {
    bgCustomNoResolution.value = img;
    bgCustom.value = convertFileSrc(img);
    board.value.background = {src: bgCustomNoResolution.value, blur: bgBlur.value, brightness: bgBrightness.value};
    updateStorage();
}

const resetBackground = () => {
    bgCustom.value = "";
    bgBlur.value = "8px";
    bgBrightness.value = "100%";

    delete board.value.background;
    updateStorage();
}

const setBlur = (blurAmount: string) => {
    bgBlur.value = blurAmount;
    board.value.background = {src: bgCustomNoResolution.value, blur: bgBlur.value, brightness: bgBrightness.value};
    updateStorage();
}

const setBrightness = (brightnessAmount: string) => {
    bgBrightness.value = brightnessAmount;
    board.value.background = {src: bgCustomNoResolution.value, blur: bgBlur.value, brightness: bgBrightness.value};
    updateStorage();
}

const enableBoardTitleEditing = () => {
    boardTitleEditing.value = true;

    nextTick(() => {
        if (boardTitleInput.value == null) return;
        boardTitleInput.value.focus();
    });
}

onMounted(async () => {
    boards.value = await store.get("boards") || [];
    board.value = boards.value[parseInt(route.params.id[0])]; // TODO: handle edge cases where for some reason id can't be parsed to int

    if (board.value.background) {
        bgCustomNoResolution.value = board.value.background.src;
        bgCustom.value = convertFileSrc(board.value.background.src);

        bgBlur.value = board.value.background.blur;
        bgBrightness.value = board.value.background.brightness;
    }
    nextTick(() => bgImageLoaded.value = true);

    document.addEventListener("keydown", keyDownListener);

    emitter.emit("openKanbanPage");

    columnEditIndex.value = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;

    emitter.on("columnActionDone", () => {
        columnCardAddMode.value = false;
        columnTitleEditing.value = false;
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
    emitter.emit("closeKanbanPage");
});

const keyDownListener = (e: KeyboardEvent) => {
    const controlOrMetaPressed: boolean = e.ctrlKey || e.metaKey;
    const controlIsOnlyKeyPressed: boolean = e.key == "Control" && e.location == 1;
    const metaIsOnlyKeyPressed: boolean = e.key == "Meta"

    // All shortcuts need control as a required key, but we don't want only control to trigger something
    if (!controlOrMetaPressed || controlIsOnlyKeyPressed || metaIsOnlyKeyPressed) return;

    // We do not want to override shortcuts for copying and pasting
    if (e.key === "a" || e.key === "c" || e.key === "v" || e.key === "x") return;

    emitter.emit("resetColumnInputs");

    // Ctrl + B for new board
    if (e.key === "b") {
        addColumn();
        scrollView();
        return;
    }

    // Arrow key left to decrease
    if (e.keyCode === 37) {
        if (columnEditIndex.value === 0 && board.value.columns.length !== 0) {
            columnEditIndex.value = board.value.columns.length - 1;
        } else {
            columnEditIndex.value--;
        }
    }

    // Arrow key right to increase
    if (e.keyCode === 39) {
        if (columnEditIndex.value == board.value.columns.length - 1 && board.value.columns.length !== 0) {
            columnEditIndex.value = 0;
        } else {
            columnEditIndex.value++;
        }
    }

    const columnID =
        board.value.columns.length !== 0 && board.value.columns[columnEditIndex.value]
            ? board.value.columns[columnEditIndex.value].id
            : "-1";

    if (columnID === "-1") return; // Guard clause to prevent impossible actions

    // ctrl + d for deleting the last column
    if (e.key === "d") {
        columnEditIndex.value = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;
        const lastColumnID = board.value.columns[columnEditIndex.value].id;

        removeColumn(lastColumnID);
        return;
    }

    // ctrl + t for enabling title editing for the last column
    if (e.key === "t" || columnTitleEditing.value === true) {
        columnTitleEditing.value = true;
        emitter.emit("enableColumnTitleEditing", columnID);
        return;
    }

    // ctrl + n for new card in the last column
    if (e.key === "n" || columnCardAddMode.value === true) {
        columnCardAddMode.value = true;
        emitter.emit("enableColumnCardAddMode", columnID);
        return;
    }
};

const scrollView = () => {
    const elem = document.getElementById("kanban-cols-container");
    if (elem == null) return;

    elem.scrollLeft = elem.scrollWidth;
};

const onDrop = (dropResult: object) => {
    board.value.columns = applyDrag(board.value.columns, dropResult);
    updateStorage();
};

const addColumn = () => {
    const column = {
        id: generateUniqueID(),
        title: "New Column",
        cards: [],
    };

    board.value.columns.push(column);
    columnEditIndex.value++;
    updateStorage();
};

const removeColumn = (columnID: string) => {
    const column = board.value.columns.filter((obj: Column) => {
        return obj.id === columnID;
    })[0];

    const columnIndex = board.value.columns.indexOf(column);
    board.value.columns.splice(columnIndex, 1);
    columnEditIndex.value--;
    delete colRefs[columnID];
    updateStorage();
};

const updateColumnProperties = (columnObj: Column) => {
    const boardSaved: Board = board.value;
    const column = boardSaved.columns.filter((obj: Column) => {
        return obj.id === columnObj.id;
    })[0];

    const columnIndex = boardSaved.columns.indexOf(column);
    boardSaved.columns[columnIndex] = columnObj;

    board.value = boardSaved;
    updateStorage();
};

const updateStorage = () => {
    const currentBoard = boards.value.filter((obj: Board) => {
        return obj.id === board.value.id;
    })[0];

    const currentBoardIndex = boards.value.indexOf(currentBoard);
    boards.value[currentBoardIndex] = board.value; // Override old board with new one
    store.set("boards", boards.value); // Override all saved boards with new altered array which includes modified current board
};
</script>

<style scoped>
.smooth-dnd-container.horizontal {
    display: flex;
    z-index: 1;
}

#kanban-cols-container {
    height: 100vh;
}

.bg-custom {
    z-index: 1;
    background-image: var(--bg-custom-image);
    background-repeat: no-repeat;
    background-size: cover;
}

.bg-effect-overlay {
    z-index: 2;
    backdrop-filter: blur(var(--blur-intensity)) brightness(var(--bg-brightness));
}
</style>
