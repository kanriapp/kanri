<template>
    <transition name="modal-fade">
        <div
            @click.self="$emit('closeModal')"
            class="modal inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-zinc-800 bg-opacity-40 bg-clip-padding backdrop-blur-xl backdrop-filter"
        >
            <div
                class="bg-elevation-1 modal-body flex h-4/5 w-2/5 flex-col items-start rounded-md py-4 pl-8 pr-6 shadow-lg"
            >
                <div class="flex w-full flex-row items-center justify-between">
                    <h1
                        @click="enableTitleEditing"
                        v-if="!titleEditing"
                        :v-model="modalTitle"
                        class="pointer-events-auto pr-5 text-2xl font-bold"
                    >
                        {{ modalTitle || title }}
                    </h1>
                    <input
                        @blur="setTitleRemote()"
                        @keypress.enter="setTitleRemote()"
                        v-if="titleEditing"
                        ref="titleInput"
                        type="text"
                        v-model="modalTitle"
                        class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto text-xl focus:border-2 focus:border-dotted focus:outline-none"
                    />
                    <div @click="$emit('closeModal')" class="p-1">
                        <svg
                            class="text-dim-4 text-accent-hover h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
                <slot name="content"></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ["title", "titleEditingAllowed"],
    data() {
        return {
            modalTitle: "",
            titleEditing: false,
        };
    },
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
