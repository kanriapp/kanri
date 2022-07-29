<template>
  <Modal
    :title="title"
    ref="barebonesModal"
    :titleEditingAllowed="true"
    @setTitle="setCardTitle"
    @closeModal="$emit('closeModal')"
  >
    <template v-slot:content>
      <span class="text-md text-dim-3 mb-6"
        >Edit all the things about your card!</span
      >
      <label for="cardDescription" class="text-lg font-semibold"
        >Card Description</label
      >
      <textarea
        @blur="updateDescription"
        @keypress.enter="updateDescription"
        v-model="description"
        name="cardDescription"
        id="cardDescription"
        cols="6"
        rows="70"
        placeholder="Enter a detailed description of your card here..."
        class="bg-elevation-2 border-accent-focus pointer-events-auto mt-2 h-40 w-11/12 resize-none rounded-md p-2 shadow-lg focus:border-2 focus:border-dotted focus:outline-none"
      >
      </textarea>
    </template>
  </Modal>
</template>

<script>
import Modal from "~/components/Modal.vue";
export default {
  components: { Modal },
  data() {
    return {
      cardId: "",
      title: "",
      description: "",
    };
  },
  methods: {
    initModal(cardID, title, description) {
      this.cardId = cardID;
      this.title = title;
      this.description = description;
      this.$refs.barebonesModal.setTitle(title);
    },
    updateDescription() {
      this.$emit("setCardDescription", this.cardId, this.description);
    },
    setCardTitle(title) {
      this.title = title;
      this.$emit("setCardTitle", this.cardId, title);
    },
  },
};
</script>
