import { Dispatch } from 'redux';
import axios from 'axios';

import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { CellType, Cell } from '../cell';
import bundle from '../../bundler/index';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells } = getState();

    if (cells) {
      const { data, order } = cells;

      const cellArray = order.map((id) => data[id]);

      try {
        await axios.post('/cells', { cells: cellArray });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({
            type: ActionType.SAVE_CELLS_ERROR,
            payload: err.message,
          });
        }
      }
    }
  };
};
