import { ActionType } from '../action-types';
import { CellType, Cell } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellAction {
  type: ActionType.FETCH_CELLS;
}

export interface FetchCellComplete {
  type: ActionType.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellError {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellAction
  | FetchCellComplete
  | FetchCellError;

// } catch (err) {
//   if (err instanceof Error) {
//     dispatch({
//       type: ActionType.FETCH_CELLS_ERROR,
//       payload: err.message,
//     });
//   }
// }

// } catch (err) {
//   if (err instanceof Error) {
//     dispatch({
//       type: ActionType.SAVE_CELLS_ERROR,
//       payload: err.message,
//     });
//   }
// }
