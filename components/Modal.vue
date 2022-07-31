<template>
    <transition name="modal-fade">
        <div
            @click.self="clickOutsideToClose ? $emit('closeModal') : (() => {})"
            class="modal inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-zinc-800 bg-opacity-40 bg-clip-padding backdrop-filter"
            :class="blurBackground ? 'backdrop-blur-xl' : 'backdrop-brightness-50'"
        >
            <div
                class="bg-elevation-1 min-h-content min-w-content rounded-md py-4 pl-8 pr-6 shadow-lg"
            >
                <slot name="content" class="p-4"></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
/*
export default {
    props: ["title", "titleEditingAllowed"],
    data() {
        return {
            modalTitle: "",
            titleEditing: false,
        };
    },
    TODO: TRANSFER KANBAN LOGIC FROM HERE!!
    methods: {
        setTitleRemote() {
            this.$emit("setTitle", this.modalTitle);
            this.titleEditing = false;
        },

        setTitle(title) {
            this.modalTitle = title;
        },

        enableTitleEditing() {
            if (!this.titleEditingAllowed) return;
            this.titleEditing = true;
            this.$nextTick(() => this.$refs.titleInput.focus());
        },
    },
};
*/
withDefaults(defineProps<{
    title?: string
    clickOutsideToClose?: boolean,
    blurBackground?: boolean
}>(), {
    title: "Card Title",
    clickOutsideToClose: true,
    blurBackground: true
})
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.35s ease-out;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal {
    position: fixed;
    max-width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
