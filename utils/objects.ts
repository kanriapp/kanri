// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export function findObjectById<Type> (objectArray: Array<Type>, objectId: string) {
    return objectArray.filter((object) => {
        // @ts-ignore
        return object.id == objectId;
    })[0];
}
