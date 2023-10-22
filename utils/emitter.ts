// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

import mitt from 'mitt';
import type { Board } from '@/types/kanban-types';

type Events = {
    createBoard: string;
    updateColors: void;

    enableColumnCardAddMode: string;
    enableColumnTitleEditing: string;

    openKanbanPage: void;
    openBoardDeleteModal: { index: number, description: string };
    openBoardRenameModal: { index: number, board: Board };
    openModalWithCustomDescription: { description: string };

    modalPreventClickOutsideClose: void;
    modalEnableClickOutsideClose: void;

    closeKanbanPage: void;
    resetColumnInputs: void;
    columnActionDone: void;

    zIndexBack: void;
    zIndexDown: void;

    showSidebarBackArrow: void;
    hideSidebarBackArrow: void;

    openChangelogModal: void;
};

const emitter = mitt<Events>();

export default emitter;
