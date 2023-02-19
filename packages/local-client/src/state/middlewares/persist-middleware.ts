import { Dispatch } from 'react';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';

export const persistMiddleware =
  ({ dispatch }: { dispatch: Dispatch<Action> }) =>
  (next: (action: Action) => void) =>
  (action: Action) => {
    next(action);
  };
