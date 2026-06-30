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
  <div class="relative mt-1" :class="{ 'kanri-rich-editor-compact': compact }">
    <editor-content class="bg-elevation-2 rounded-sm" :editor="editor" />
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { mergeAttributes, Node } from "@tiptap/core";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { richHtmlToPlainEditorHtml, sanitizeRichHtml } from "@/utils/richContent";
import emitter from "@/utils/emitter";
import { filesFromTransfer } from "@/utils/fileTransfer";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

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
      typeLabel: {
        default: "Attachment",
        parseHTML: element => element.getAttribute("data-attachment-type-label") || "Attachment",
        renderHTML: attributes => ({ "data-attachment-type-label": attributes.typeLabel || "Attachment" }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: "div[data-attachment-id]" },
      { tag: "a[data-attachment-id]" },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "kanri-file-attachment",
        contenteditable: "false",
        draggable: "true",
        role: "button",
        tabindex: "0",
      }),
      ["span", { class: "kanri-file-attachment-preview" }, HTMLAttributes["data-attachment-type-label"] || "File"],
      [
        "span",
        { class: "kanri-file-attachment-meta" },
        ["span", { class: "kanri-file-attachment-name" }, HTMLAttributes.title || "Attachment"],
        ["span", { class: "kanri-file-attachment-kind" }, HTMLAttributes["data-attachment-type-label"] || "File"],
      ],
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
      attachmentId: {
        default: null,
        parseHTML: element => element.getAttribute("data-attachment-id"),
        renderHTML: attributes => (
          attributes.attachmentId ? { "data-attachment-id": attributes.attachmentId } : {}
        ),
      },
    };
  },
});

export default {
  components: {
    EditorContent,
  },

  props: {
    compact: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      default: "",
      type: String,
    },
    submitOnEnter: {
      default: false,
      type: Boolean,
    },
  },

  emits: ["assetClicked", "update:modelValue", "editorBlurred", "editorSubmitted", "filesReceived"],

  setup(props, { emit }) {
    const editor = ref(null);

    const clampPosition = (position) => {
      if (!editor.value || typeof position !== "number") return undefined;
      const maxPosition = editor.value.state.doc.content.size;
      return Math.min(Math.max(position, 0), maxPosition);
    };

    const currentInsertAt = () => {
      if (!editor.value) return undefined;
      return editor.value.state.selection.from;
    };

    const endPosition = () => {
      if (!editor.value) return undefined;
      return editor.value.state.doc.content.size;
    };

    const emitFiles = (files, insertAt = currentInsertAt()) => {
      if (files.length === 0) return false;
      emit("filesReceived", { files, insertAt });
      return true;
    };

    const isAssetNode = node => !!node?.attrs?.assetId || node?.type?.name === "attachmentBlock";

    const isCompositionEnter = event => event.isComposing || event.keyCode === 229;

    const shouldSubmitOnEnter = event =>
      props.submitOnEnter &&
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      !isCompositionEnter(event);

    const shouldInsertLineBreak = event =>
      !props.submitOnEnter &&
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      !isCompositionEnter(event);

    const deleteAssetNode = (view, direction) => {
      const { selection } = view.state;
      if (selection instanceof NodeSelection && isAssetNode(selection.node)) {
        view.dispatch(view.state.tr.delete(selection.from, selection.to));
        return true;
      }

      if (!selection.empty) return false;

      const resolved = view.state.doc.resolve(selection.from);
      let adjacentNode = direction === "backward" ? resolved.nodeBefore : resolved.nodeAfter;
      let from = direction === "backward"
        ? selection.from - (adjacentNode?.nodeSize || 0)
        : selection.from;
      let to = direction === "backward"
        ? selection.from
        : selection.from + (adjacentNode?.nodeSize || 0);

      if (!isAssetNode(adjacentNode) && direction === "backward" && resolved.parentOffset === 0 && resolved.depth > 0) {
        const beforeParent = resolved.before();
        const parentBoundary = view.state.doc.resolve(beforeParent);
        adjacentNode = parentBoundary.nodeBefore;
        if (isAssetNode(adjacentNode)) {
          from = beforeParent - adjacentNode.nodeSize;
          to = beforeParent;
        }
      }

      if (!isAssetNode(adjacentNode) && direction === "forward" && resolved.parentOffset === resolved.parent.content.size && resolved.depth > 0) {
        const afterParent = resolved.after();
        const parentBoundary = view.state.doc.resolve(afterParent);
        adjacentNode = parentBoundary.nodeAfter;
        if (isAssetNode(adjacentNode)) {
          from = afterParent;
          to = afterParent + adjacentNode.nodeSize;
        }
      }

      if (!isAssetNode(adjacentNode)) return false;

      view.dispatch(view.state.tr.delete(from, to));
      return true;
    };

    const emptyParentRange = (position) => {
      if (!editor.value || typeof position !== "number") return null;

      const resolved = editor.value.state.doc.resolve(position);
      if (resolved.depth === 0) return null;
      if (!resolved.parent.isTextblock || resolved.parent.content.size !== 0) return null;

      return {
        from: resolved.before(),
        to: resolved.after(),
      };
    };

    const textToInsertContent = (text) => {
      const normalized = (text || "").replace(/\r\n?/g, "\n");
      return normalized
        .split(/\n{2,}/)
        .map((paragraph) => {
          const lines = paragraph.split("\n");
          return {
            type: "paragraph",
            content: lines.flatMap((line, index) => {
              const content = [];
              if (line) content.push({ type: "text", text: line });
              if (index < lines.length - 1) content.push({ type: "hardBreak" });
              return content;
            }),
          };
        });
    };

    const insertPlainText = (text) => {
      const content = textToInsertContent(text);
      if (content.length === 0) return false;
      editor.value?.chain().focus().insertContent(content).run();
      return true;
    };

    watch(
      () => props.modelValue,
      (value) => {
        const content = richHtmlToPlainEditorHtml(value);
        if (editor.value && editor.value.getHTML() !== content) {
          editor.value.commands.setContent(content, false);
        }
      }
    );

    onMounted(() => {
      editor.value = new Editor({
        content: richHtmlToPlainEditorHtml(props.modelValue),
        extensions: [
          StarterKit.configure({
            blockquote: false,
            bold: false,
            bulletList: false,
            code: false,
            codeBlock: false,
            heading: false,
            horizontalRule: false,
            italic: false,
            listItem: false,
            orderedList: false,
            strike: false,
          }),
          AssetImage.configure({
            allowBase64: false,
            HTMLAttributes: {
              class: "kanri-rich-image",
            },
          }),
          AttachmentBlock,
          Table.configure({
            resizable: false,
            HTMLAttributes: {
              class: "kanri-rich-table",
            },
          }),
          TableRow,
          TableHeader,
          TableCell,
        ],
        editorProps: {
          handleDrop(view, event) {
            const files = filesFromTransfer(event.dataTransfer, "drop");
            if (files.length === 0) return false;
            let insertAt = view.state.selection.from;
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            if (coordinates) {
              insertAt = coordinates.pos;
              view.dispatch(view.state.tr.setSelection(
                TextSelection.near(view.state.doc.resolve(coordinates.pos))
              ));
            }
            event.preventDefault();
            return emitFiles(files, insertAt);
          },
          handlePaste(view, event) {
            const files = filesFromTransfer(event.clipboardData, "paste");
            if (files.length > 0) {
              const insertAt = view.state.selection.from;
              event.preventDefault();
              return emitFiles(files, insertAt);
            }

            const html = event.clipboardData?.getData("text/html") || "";
            if (/<table[\s>]/i.test(html)) return false;

            const text = event.clipboardData?.getData("text/plain") || "";
            if (!text) return false;

            event.preventDefault();
            return insertPlainText(text);
          },
          handleKeyDown(view, event) {
            if (
              view.state.selection instanceof NodeSelection &&
              isAssetNode(view.state.selection.node) &&
              (event.key === "Enter" || event.key === " ")
            ) {
              event.preventDefault();
              emit("assetClicked", view.state.selection.node.attrs.assetId);
              return true;
            }
            if (shouldSubmitOnEnter(event)) {
              event.preventDefault();
              view.dom.blur();
              emit("editorSubmitted");
              return true;
            }
            if (shouldInsertLineBreak(event)) {
              event.preventDefault();
              editor.value?.chain().focus().setHardBreak().run();
              return true;
            }
            if (event.key === "Backspace" && deleteAssetNode(view, "backward")) {
              event.preventDefault();
              return true;
            }
            if (event.key === "Delete" && deleteAssetNode(view, "forward")) {
              event.preventDefault();
              return true;
            }
            return false;
          },
          handleClick(_view, _pos, event) {
            const assetElement = event.target?.closest?.("[data-asset-id]");
            const assetId = assetElement?.getAttribute?.("data-asset-id");
            if (!assetId) return false;
            emit("assetClicked", assetId);
            event.preventDefault();
            return true;
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

    const insertAtPosition = (content, insertAt) => {
      if (!editor.value) return undefined;
      const position = clampPosition(insertAt);
      const chain = editor.value.chain().focus();
      const replaceRange = emptyParentRange(position);
      if (position == null) {
        chain.insertContent(content).run();
      } else if (replaceRange) {
        chain.insertContentAt(replaceRange, content, { updateSelection: true }).run();
      } else {
        chain.insertContentAt(position, content, { updateSelection: true }).run();
      }
      return editor.value.state.selection.to;
    };

    const insertImage = (src, assetId, alt = "", insertAt, attachmentId = null) => {
      return insertAtPosition({
        type: "image",
        attrs: { assetId, attachmentId, src, alt, title: alt },
      }, insertAt);
    };

    const insertAttachment = (attachment, insertAt) => {
      return insertAtPosition({
        type: "attachmentBlock",
        attrs: attachment,
      }, insertAt);
    };

    return {
      editor,
      endPosition,
      insertAttachment,
      insertImage,
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

.tiptap p {
  margin: 0 0 0.35rem;
}

.tiptap p:last-child {
  margin-bottom: 0;
}

.tiptap.ProseMirror {
  height: 148px;
  overflow: auto;
  padding: 4px;
  resize: vertical;
}

.kanri-rich-editor-compact .tiptap.ProseMirror {
  height: auto;
  line-height: 1.3;
  min-height: 1.55rem;
  overflow: visible;
  padding-bottom: 2px;
  padding-top: 2px;
  resize: none;
}

.kanri-rich-editor-compact .tiptap p {
  margin: 0;
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
  max-height: 132px;
  object-fit: contain;
  width: min(180px, 100%);
  height: auto;
  border: 1px solid var(--elevation-3);
  background: var(--elevation-1);
}

.tiptap img:first-child {
  margin-top: 0;
}

.kanri-rich-editor-compact .tiptap img {
  max-height: 72px;
  width: min(96px, 100%);
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
  max-width: min(100%, 18rem);
  min-height: 3.25rem;
  padding: 0.35rem;
  text-decoration: none;
  width: 18rem;
  cursor: pointer;
  user-select: none;
}

.kanri-file-attachment:hover {
  background: var(--elevation-2);
}

.kanri-file-attachment-preview {
  align-items: center;
  align-self: stretch;
  background: color-mix(in srgb, var(--accent) 18%, var(--elevation-2));
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  border-radius: 0.25rem;
  color: var(--text);
  display: flex;
  flex: 0 0 3.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1;
  max-width: 3.25rem;
  overflow: hidden;
  padding: 0.25rem;
  text-align: center;
  text-transform: uppercase;
}

.kanri-file-attachment-meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.kanri-file-attachment-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.88rem;
  font-weight: 600;
}

.kanri-file-attachment-kind {
  color: var(--text-dim-2);
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kanri-rich-editor-compact .kanri-file-attachment {
  max-width: min(100%, 13rem);
  min-height: 2.5rem;
  width: 13rem;
}

.kanri-rich-editor-compact .kanri-file-attachment-preview {
  flex-basis: 2.5rem;
  max-width: 2.5rem;
}

.kanri-rich-editor-compact .kanri-file-attachment-name {
  font-size: 0.82rem;
}
</style>
