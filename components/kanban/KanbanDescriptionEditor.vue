<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

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

      <button
        :class="{ 'is-active': editor.isActive('link') }"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Link"
        @click="setLink"
      >
        <ph-link-simple class="size-5" />
      </button>
      <button
        class="bg-elevation-2-hover rounded-md p-1"
        title="Insert Attachment"
        @click="$emit('requestFiles')"
      >
        <ph-paperclip class="size-5" />
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

      <div class="bg-elevation-3 mx-1 h-6 w-px" />

      <button
        class="bg-elevation-2-hover rounded-md p-1"
        title="Insert Table"
        @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
      >
        <ph-table class="size-5" />
      </button>
      <button
        v-if="editor.isActive('table')"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Add Row"
        @click="editor.chain().focus().addRowAfter().run()"
      >
        <ph-rows-plus-bottom class="size-5" />
      </button>
      <button
        v-if="editor.isActive('table')"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Add Column"
        @click="editor.chain().focus().addColumnAfter().run()"
      >
        <ph-columns-plus-right class="size-5" />
      </button>
      <button
        v-if="editor.isActive('table')"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Toggle Header Row"
        @click="editor.chain().focus().toggleHeaderRow().run()"
      >
        <ph-rows class="size-5" />
      </button>
      <button
        v-if="editor.isActive('table')"
        class="bg-elevation-2-hover rounded-md p-1"
        title="Delete Table"
        @click="editor.chain().focus().deleteTable().run()"
      >
        <ph-trash class="size-5" />
      </button>
    </div>
  </bubble-menu>
  <div class="relative mt-1">
    <editor-content class="bg-elevation-2 rounded-sm" :editor="editor" />
    <button
      class="bg-elevation-3-hover text-dim-2 text-accent-hover absolute right-2 top-2 rounded-md p-1"
      title="Insert Attachment"
      @mousedown.prevent
      @click="$emit('requestFiles')"
    >
      <ph-paperclip class="size-5" />
    </button>
  </div>
</template>

<script>
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { mergeAttributes, Node } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import { sanitizeRichHtml } from "@/utils/richContent";
import emitter from "@/utils/emitter";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  PhTextB,
  PhTextItalic,
  PhTextStrikethrough,
  PhCode,
  PhFileCode,
  PhColumnsPlusRight,
  PhLinkSimple,
  PhPaperclip,
  PhRows,
  PhRowsPlusBottom,
  PhTable,
  PhTrash,
  PhTextAlignLeft,
  PhTextAlignCenter,
  PhTextAlignRight,
  PhTextAlignJustify,
} from "@phosphor-icons/vue";

const AttachmentBlock = Node.create({
  name: "attachmentBlock",
  group: "block",
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      assetId: {
        default: null,
        parseHTML: element => element.getAttribute("data-asset-id"),
        renderHTML: attributes => ({ "data-asset-id": attributes.assetId }),
      },
      attachmentId: {
        default: null,
        parseHTML: element => element.getAttribute("data-attachment-id"),
        renderHTML: attributes => ({ "data-attachment-id": attributes.attachmentId }),
      },
      href: {
        default: "#",
        parseHTML: element => element.getAttribute("href") || "#",
        renderHTML: attributes => ({ href: attributes.href || "#" }),
      },
      kind: {
        default: "other",
        parseHTML: element => element.getAttribute("data-attachment-kind") || "other",
        renderHTML: attributes => ({ "data-attachment-kind": attributes.kind || "other" }),
      },
      label: {
        default: "Attachment",
        parseHTML: element => element.getAttribute("title") || element.textContent || "Attachment",
        renderHTML: attributes => ({ title: attributes.label || "Attachment" }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "a[data-attachment-id]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        class: "kanri-file-attachment",
        contenteditable: "false",
      }),
      ["span", { class: "kanri-file-attachment-icon" }, "Attachment"],
      ["span", { class: "kanri-file-attachment-name" }, HTMLAttributes.title || "Attachment"],
    ];
  },
});

const AssetImage = Image.extend({
  addAttributes() {
    return {
      ...(this.parent?.() || {}),
      assetId: {
        default: null,
        parseHTML: element => element.getAttribute("data-asset-id"),
        renderHTML: attributes => (
          attributes.assetId ? { "data-asset-id": attributes.assetId } : {}
        ),
      },
    };
  },
});

export default {
  components: {
    PhTextB,
    PhTextItalic,
    EditorContent,
    BubbleMenu,
    PhTextStrikethrough,
    PhColumnsPlusRight,
    PhCode,
    PhFileCode,
    PhLinkSimple,
    PhPaperclip,
    PhRows,
    PhRowsPlusBottom,
    PhTable,
    PhTrash,
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

  emits: ["update:modelValue", "editorBlurred", "filesReceived", "requestFiles"],

  setup(props, { emit }) {
    const editor = ref(null);

    const timestampName = (extension = "png") => {
      const value = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace("T", "-")
        .slice(0, 15);
      return `pasted-image-${value}.${extension}`;
    };

    const extensionFromType = (type) => {
      switch (type) {
        case "image/jpeg":
          return "jpg";
        case "image/gif":
          return "gif";
        case "image/webp":
          return "webp";
        case "image/svg+xml":
          return "svg";
        case "image/png":
        default:
          return "png";
      }
    };

    const filePath = (file) => ("path" in file ? String(file.path || "") : "");

    const getTransferFiles = (dataTransfer, source) => {
      const files = [];
      const seen = new Set();
      const addFile = (file) => {
        if (!file) return;
        const key = `${file.name}-${file.size}-${file.type}-${filePath(file)}`;
        if (seen.has(key)) return;
        seen.add(key);
        const isPathlessPastedImage = source === "paste" && file.type?.startsWith("image/") && !filePath(file);
        files.push({
          file,
          name: isPathlessPastedImage ? timestampName(extensionFromType(file.type)) : file.name,
          path: filePath(file),
        });
      };

      Array.from(dataTransfer?.items || []).forEach((item) => {
        if (item.kind === "file") addFile(item.getAsFile());
      });
      Array.from(dataTransfer?.files || []).forEach(addFile);
      return files;
    };

    const emitFiles = (files) => {
      if (files.length === 0) return false;
      emit("filesReceived", files);
      return true;
    };

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
          AssetImage.configure({
            allowBase64: false,
            HTMLAttributes: {
              class: "kanri-rich-image",
            },
          }),
          AttachmentBlock,
          Link.configure({
            autolink: true,
            defaultProtocol: "https",
            openOnClick: false,
            protocols: ["https"],
          }),
          Table.configure({
            resizable: false,
            HTMLAttributes: {
              class: "kanri-rich-table",
            },
          }),
          TableRow,
          TableHeader,
          TableCell,
          Typography,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
        ],
        editorProps: {
          handleDrop(view, event) {
            const files = getTransferFiles(event.dataTransfer, "drop");
            if (files.length === 0) return false;
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            if (coordinates) {
              view.dispatch(view.state.tr.setSelection(
                TextSelection.near(view.state.doc.resolve(coordinates.pos))
              ));
            }
            event.preventDefault();
            return emitFiles(files);
          },
          handlePaste(_view, event) {
            const files = getTransferFiles(event.clipboardData, "paste");
            if (files.length === 0) return false;
            event.preventDefault();
            return emitFiles(files);
          },
        },
        onBlur: () => {
          emit("editorBlurred");
        },
        onFocus: () => {
          emitter.emit("modalPreventClickOutsideClose");
        },
        onUpdate: () => {
          emit("update:modelValue", sanitizeRichHtml(editor.value.getHTML()));
        },
      });
    });

    onBeforeUnmount(() => {
      if (editor.value) {
        editor.value.destroy();
      }
    });

    const setLink = () => {
      if (!editor.value) return;

      const previousUrl = editor.value.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl || "https://");
      if (url === null) return;
      if (url === "") {
        editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      if (!url.startsWith("https://")) return;

      editor.value
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
        .run();
    };

    const insertImage = (src, assetId, alt = "") => {
      if (!editor.value) return;
      editor.value
        .chain()
        .focus()
        .setImage({ assetId, src, alt, title: alt })
        .run();
    };

    const insertAttachment = (attachment) => {
      if (!editor.value) return;
      editor.value
        .chain()
        .focus()
        .insertContent({
          type: "attachmentBlock",
          attrs: attachment,
        })
        .run();
    };

    return {
      editor,
      insertAttachment,
      insertImage,
      setLink,
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
  padding-right: 2.5rem;
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
  border-radius: 0.375rem;
  cursor: zoom-in;
  display: block;
  margin: 0.5rem 0;
  max-width: 100%;
  max-height: 360px;
  object-fit: contain;
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

.tiptap table {
  border-collapse: collapse;
  margin: 0.75rem 0;
  table-layout: auto;
  width: 100%;
}

.tiptap td,
.tiptap th {
  border: 1px solid var(--elevation-3);
  min-width: 3rem;
  padding: 0.35rem 0.5rem;
  vertical-align: top;
}

.tiptap th {
  background-color: var(--elevation-1);
  font-weight: 600;
}

.tiptap a {
  color: var(--accent);
  text-decoration: underline;
}

.kanri-file-attachment {
  align-items: center;
  background: var(--elevation-1);
  border: 1px solid var(--elevation-3);
  border-radius: 0.375rem;
  color: var(--text);
  display: flex;
  gap: 0.5rem;
  margin: 0.35rem 0;
  max-width: 100%;
  padding: 0.4rem 0.55rem;
  text-decoration: none;
  width: fit-content;
}

.kanri-file-attachment-icon {
  color: var(--text-dim-2);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.kanri-file-attachment-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
