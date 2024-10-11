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
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <div
      class="bg-primary border-elevation-1 -mb-1.5 flex flex-row items-center gap-1 rounded-md border px-2 py-1"
    >
      <button
        :class="{ 'is-active': editor.isActive('bold') }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Bold"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <ph-text-b class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('italic') }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Italic"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <ph-text-italic class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('strike') }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Strikethrough"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <ph-text-strikethrough class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('code') }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Code"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <ph-code class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Code Block"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <ph-file-code class="size-5" />
      </button>

      <div class="bg-elevation-3 mx-1 h-6 w-px" />

      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Align Left"
        @click="editor.chain().focus().setTextAlign('left').run()"
      >
        <ph-text-align-left class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Align Center"
        @click="editor.chain().focus().setTextAlign('center').run()"
      >
        <ph-text-align-center class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Align Right"
        @click="editor.chain().focus().setTextAlign('right').run()"
      >
        <ph-text-align-right class="size-5" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Justify"
        @click="editor.chain().focus().setTextAlign('justify').run()"
      >
        <ph-text-align-justify class="size-5" />
      </button>
    </div>
  </bubble-menu>
  <editor-content class="bg-elevation-2 mt-1 rounded-sm" :editor="editor" />
</template>

<script>
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import {
  PhTextB,
  PhTextItalic,
  PhTextStrikethrough,
  PhCode,
  PhFileCode,
  PhTextAlignLeft,
  PhTextAlignCenter,
  PhTextAlignRight,
  PhTextAlignJustify,
} from "@phosphor-icons/vue";

export default {
  components: {
    PhTextB,
    PhTextItalic,
    EditorContent,
    BubbleMenu,
    PhTextStrikethrough,
    PhCode,
    PhFileCode,
    PhTextAlignLeft,
    PhTextAlignCenter,
    PhTextAlignRight,
    PhTextAlignJustify,
  },

  props: {
    modelValue: {
      default: "",
      type: String,
    },
  },

  emits: ["update:modelValue", "editorBlurred"],

  setup(props, { emit }) {
    const editor = ref(null);

    watch(
      () => props.modelValue,
      (value) => {
        if (editor.value && editor.value.getHTML() !== value) {
          editor.value.commands.setContent(value, false);
        }
      }
    );

    onMounted(() => {
      editor.value = new Editor({
        content: props.modelValue,
        extensions: [
          StarterKit,
          Typography,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
        ],
        onBlur: () => {
          emit("editorBlurred");
        },
        onFocus: () => {
          emitter.emit("modalPreventClickOutsideClose");
        },
        onUpdate: () => {
          emit("update:modelValue", editor.value.getHTML());
        },
      });
    });

    onBeforeUnmount(() => {
      if (editor.value) {
        editor.value.destroy();
      }
    });

    return {
      editor,
    };
  },
};
</script>

<style>
.tiptap:focus {
  outline: none;
}

.tiptap h1 {
  font-size: larger;
  font-weight: bold;
  margin-bottom: 4px;
}

.tiptap h2 {
  font-size: medium;
  font-weight: bold;
}

.tiptap.ProseMirror {
  height: 148px;
  overflow: auto;
  padding: 4px;
  resize: vertical;
}

.tiptap ul {
  padding: 0 1.3rem;
}

.tiptap ol {
  list-style: decimal;
  padding: 0 1.6rem;
}

.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.1;
}

.tiptap code {
  background-color: rgba(0, 0, 0, 0.1);
  color: color-mix(in srgb, var(--accent) 50%, white);
}

.tiptap pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
}

.tiptap pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.tiptap img {
  max-width: 100%;
  height: auto;
}

.tiptap hr {
  margin: 1rem 0;
}

.tiptap blockquote {
  padding-left: 1rem;
  border-left: 2px solid var(--text-dim-2);
}

.tiptap ul::marker {
  color: var(-text-normal);
}

.tiptap ul {
  list-style-type: disc;
}
</style>
