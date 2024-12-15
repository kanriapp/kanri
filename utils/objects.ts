// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0

export function findObjectById<Type extends Partial<{ id: string }>>(
  objectArray: Array<Type>,
  objectId: string
) {
  return objectArray.filter((object: Partial<{ id: string }>) => {
    return object.id == objectId;
  })[0];
}
