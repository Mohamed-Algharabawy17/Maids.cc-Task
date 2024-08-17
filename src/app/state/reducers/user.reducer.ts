import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchUser,
  fetchUserFailure,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchUserSuccess,
} from '../actions/user.action';
import { UserState } from '../../models/userState.model';
import { UserStateProgress } from '../../components/Enums/userStateProgress';

export const initialState: UserState = {
  users: [],
  user: null,
  total_pages: 0,
  totalUsers: 0,
  status: UserStateProgress.idle,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(fetchUsers, (state) => ({
    ...state,
    status: UserStateProgress.loading,
    error: null,
  })),
  on(fetchUsersSuccess, (state, { users, total_pages, total }) => ({
    ...state,
    users,
    status: UserStateProgress.succeeded,
    total_pages: total_pages,
    totalUsers: total,
  })),
  on(fetchUsersFailure, (state, { error }) => ({
    ...state,
    error,
    status: UserStateProgress.failed,
  })),

  on(fetchUser, (state) => ({ ...state, status: UserStateProgress.loading })),
  on(fetchUserSuccess, (state, { user }) => ({
    ...state,
    user,
    status: UserStateProgress.succeeded,
  })),
  on(fetchUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: UserStateProgress.failed,
  }))
);

export function userReducer(state: UserState, action: Action) {
  return _userReducer(state, action);
}
export { UserState };
