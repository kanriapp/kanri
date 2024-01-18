// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

import type { Board, Column } from '@/types/kanban-types';

import mitt from 'mitt';

type Events = {
    closeKanbanPage: void;

    columnActionDone: void;
    columnDraggingOff: void;
    columnDraggingOn: void;

    createBoard: { columns?: Array<Column>, title: string };

    enableColumnCardAddMode: string;
    enableColumnTitleEditing: string;

    hideSidebarBackArrow: void;

    modalEnableClickOutsideClose: void;
    modalPreventClickOutsideClose: void;

    openBoardDeleteModal: { description: string, index: number };
    openBoardRenameModal: { board: Board, index: number };
    openChangelogModal: void;
    openKanbanPage: void;
    openModalWithCustomDescription: { description: string };

    resetColumnInputs: void;

    setAnimationsOff: void;
    setAnimationsOn: void;

    showSidebarBackArrow: void;
    updateColors: void;

    zIndexBack: void;
    zIndexDown: void;
};

const emitter = mitt<Events>();

export default emitter;
