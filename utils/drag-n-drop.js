// SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0

export function applyDrag(arr, dragResult) {
  const { addedIndex, payload, removedIndex } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  console.log("Payload:", payload);

  if (removedIndex !== null) {
    // Try to locate the item to remove in a robust way:
    // 1. Prefer strict identity match
    // 2. If that fails, try matching by common id fields (id, ID, _id)
    // 3. Fallback to using the provided removedIndex (if in range)
    let indexToRemove = -1;

    if (payload != null) {
      indexToRemove = result.findIndex(item => item === payload);

      if (indexToRemove === -1) {
        const payloadId = payload && (payload.id ?? payload.ID ?? payload._id);
        if (typeof payloadId !== 'undefined') {
          indexToRemove = result.findIndex(item => {
            if (!item) return false;
            const itemId = item.id ?? item.ID ?? item._id;
            return typeof itemId !== 'undefined' && itemId === payloadId;
          });
        }
      }
    }

    // If we still didn't find it, fall back to the removedIndex if valid
    if (indexToRemove === -1) {
      if (Number.isInteger(removedIndex) && removedIndex >= 0 && removedIndex < result.length) {
        indexToRemove = removedIndex;
      }
    }

    if (indexToRemove !== -1) {
      itemToAdd = result.splice(indexToRemove, 1)[0];
    } else {
      // Could not locate anything to remove; leave itemToAdd as the payload
      // (so it will be inserted if addedIndex is provided)
    }
  }

  if (addedIndex !== null) {
    // Clamp insertion index to valid bounds
    const insertIndex = Math.max(0, Math.min(result.length, addedIndex));
    result.splice(insertIndex, 0, itemToAdd);
  }

  return result;
}
