
/* 
    Utility func to sort items alphabetically by their title property.
    Most notably, it sorts immutably, returning a sorted copy without side effects.
*/
export function sortItemsAlphabetically<Type extends Partial<{ title: string }>>(items: Array<Type>) {
  return items.toSorted((a, b) => {
    const titleA = a.title ? a.title.toLowerCase() : "";
    const titleB = b.title ? b.title.toLowerCase() : "";
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
}

/*
    Utility func to sort items by their lastEdited property, with most recently edited first.
    Most notably, it sorts immutably, returning a sorted copy without side effects.
*/
export function sortItemsByLastEdited<Type extends Partial<{ lastEdited: Date | string }>>(items: Array<Type>) {
  return items.toSorted((a, b) => {
    const dateA = a.lastEdited ? new Date(a.lastEdited) : new Date(0);
    const dateB = b.lastEdited ? new Date(b.lastEdited) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

/*
    Utility func to sort items by their createdAt property, with most recently created first.
    Most notably, it sorts immutably, returning a sorted copy without side effects.
    Fallback behavior uses the original order of items if createdAt is missing, treating them as equal.
*/
export function sortItemsByCreatedAt<Type extends Partial<{ createdAt: Date | string }>>(items: Array<Type>) {
  return items.toSorted((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : null;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : null;
    if (dateA === null && dateB === null) return 0;
    if (dateA === null) return 1;
    if (dateB === null) return -1;
    return dateB - dateA;
  });
}

export function getSortingFunctionFromString<Type extends Partial<{ title: string; lastEdited: Date | string; createdAt: Date | string }>>(sortingPreference: string) {
  switch (sortingPreference) {
    case "alphabetical":
      return sortItemsAlphabetically<Type>;
    case "lastEdited":
      return sortItemsByLastEdited<Type>;
    case "createdAt":
      return sortItemsByCreatedAt<Type>;
    default:
      return sortItemsByCreatedAt<Type>;
  }
}