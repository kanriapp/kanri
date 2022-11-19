import mitt from 'mitt';
import { Board, Card } from '~/types/kanban-types';

type Events = {
    createBoard: string;
    updateColors: void;

    enableColumnCardAddMode: string;
    enableColumnTitleEditing: string;

    openKanbanModal: {index: number, el: Card};
    openKanbanPage: void;
    openBoardRenameModal: {index: number, board: Board};

    closeKanbanPage: void;
    resetColumnInputs: string;
    columnActionDone: void;

    zIndexBack: void;
    zIndexDown: void;
};

const emitter = mitt<Events>();

export default emitter;