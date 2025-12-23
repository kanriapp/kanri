export const useContextMenuClasses = () => {
  const globalSettingsStore = useSettingsStore();

  const contextMenuClass = computed(() => {
    let contextMenuClass =
      "bg-primary-darker border-elevation-1 z-[99999] min-w-[100px] rounded-md border p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform]";

    if (globalSettingsStore.animationsEnabled) {
      contextMenuClass +=
        " data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade";
    }

    return contextMenuClass;
  });

  const contextMenuItemClass = computed(() => {
    let itemClass =
      "bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center justify-between rounded-md  py-1.5 px-4";

    return itemClass;
  });

  return {
    contextMenuClass,
    contextMenuItemClass,
  };
};
