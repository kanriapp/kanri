<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ComboboxRoot v-model="selectedLocale" class="relative">
    <ComboboxAnchor
      class="bg-elevation-1 border-elevation-1 hover:bg-elevation-2 data-[placeholder]:text-primary-light inline-flex h-[35px] min-w-[160px] cursor-pointer items-center justify-between gap-[5px] rounded px-[15px]"
    >
      <ComboboxTrigger
        class="flex w-full flex-row items-center justify-between"
      >
        <span>{{ currentLocale.name }}</span>

        <PhCaretDown class="text-primary-light size-3" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="bg-elevation-1 absolute z-10 mt-2 w-full min-w-[160px] overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
    >
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty
          class="text-elevation-3 py-2 text-center text-xs font-medium"
        />

        <ComboboxGroup>
          <ComboboxItem
            v-for="locale in locales"
            :key="locale.code"
            class="text-primary-light data-[disabled]:text-elevation-3 data-[highlighted]:bg-primary-dark data-[highlighted]:text-primary-light relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
            :value="locale.code"
          >
            <ComboboxItemIndicator
              class="absolute left-0 inline-flex w-[25px] items-center justify-center"
            >
              <PhCheck class="text-primary-light size-4" />
            </ComboboxItemIndicator>
            <span>{{ locale.name }}</span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";

const { locale, locales, setLocale } = useI18n();
const selectedLocale = ref(locale);

const currentLocale = computed(() => {
  return locales.value.filter((i) => i.code === locale.value)[0];
});

const setLang = (newLocale: string) => {
  setLocale(newLocale);
};

watch(selectedLocale, (newLocale) => {
  setLang(newLocale ?? "en");
});
</script>
