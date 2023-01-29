// SPDX-FileCopyrightText: 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
