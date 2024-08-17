import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { AppState } from '../../models/appState.model';

const selectUser = (state: AppState): UserState => state.user;

export const selectUsers = createSelector(
  selectUser,
  (state: UserState) => state.users
);

export const selectOneUser = createSelector(
  selectUser,
  (state: UserState) => state.user
);

export const selectUserStatus = createSelector(
  selectUser,
  (state) => state.status
);

export const selectTotalPages = createSelector(
  selectUser,
  (state) => state.total_pages
);

export const selectTotalUsers = createSelector(
  selectUser,
  (state) => state.totalUsers
);

export const selectUserError = createSelector(
  selectUser,
  (state) => state.error
);
