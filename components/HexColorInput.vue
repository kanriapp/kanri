<template>
  <input
    v-model="inputValue"
    class="bg-elevation-1 w-24 rounded-md px-2"
    type="text"
    maxlength="7"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // Always start with #
  if (!value.startsWith("#")) {
    value = "#" + value.replace(/[^0-9A-Fa-f]/g, "");
  }

  // If user deletes everything, reset to #
  if (value === "" || value === "#") {
    inputValue.value = "#";
    emit("update:modelValue", "#");
    return;
  }

  // Only allow up to 6 hex digits after #
  value = value.slice(0, 7);
  if (!/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
    value = "#" + value.slice(1).replace(/[^0-9A-Fa-f]/g, "");
    value = value.slice(0, 7);
  }

  inputValue.value = value;
  emit("update:modelValue", value);
}
</script>
