<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<!-- eslint-disable perfectionist/sort-objects -->
<template>
  <editor-content
    class="bg-elevation-2 mt-1 rounded-sm"
    :editor="editor"
  />
</template>

<script>
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
    components: {
        EditorContent,
    },

    props: {
        modelValue: {
            default: '',
            type: String,
        },
    },

    // eslint-disable-next-line perfectionist/sort-objects
    emits: ['update:modelValue', 'editorBlurred'],

    // eslint-disable-next-line perfectionist/sort-objects
    data() {
        return {
            editor: null,
        }
    },

    watch: {
        modelValue(value) {
        // HTML
            const isSame = this.editor.getHTML() === value

            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
        },
    },

    // eslint-disable-next-line perfectionist/sort-objects
    beforeUnmount() {
        this.editor.destroy()
    },

    // eslint-disable-next-line perfectionist/sort-objects
    mounted() {
        this.editor = new Editor({
            // eslint-disable-next-line perfectionist/sort-objects
            content: this.modelValue,
            extensions: [
                StarterKit,
                Typography
            ],
            onBlur: () => {
                this.$emit('editorBlurred');
            },
            onFocus: () => {
                emitter.emit('modalPreventClickOutsideClose');
            },
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            }
        })
    },
}
</script>

<style>
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
    height: 164px;
    overflow: auto;
    padding: 4px;
}

 .tiptap ul, .tiptap ol {
    padding: 0 1rem;
}
 .tiptap h1, .tiptap h2, .tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6 {
    line-height: 1.1;
}
 .tiptap code {
    background-color: rgba(0, 0, 0, 0.1);
    color: color-mix(in srgb, var(--accent) 50%, white);
}
 .tiptap pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
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
