// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0
import { createId } from '@paralleldrive/cuid2';

export function generateUniqueID() {
    return createId();
}
