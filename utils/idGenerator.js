// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0
import { createId } from '@paralleldrive/cuid2';

export function generateUniqueID() {
    return createId();
}
