import { createAction, props } from '@ngrx/store';

export const fetchUsers = createAction(
  '[User] fetch Users',
  props<{ page: number }>()
);
export const fetchUsersSuccess = createAction(
  '[User] fetch Users Success',
  props<{ users: any[]; total_pages: number; total: number }>()
);
export const fetchUsersFailure = createAction(
  '[User] fetch Users Failure',
  props<{ error: any }>()
);

export const fetchUser = createAction(
  '[User] fetch User',
  props<{ id: number }>()
);
export const fetchUserSuccess = createAction(
  '[User] fetch User Success',
  props<{ user: any }>()
);

export const fetchUserFailure = createAction(
  '[User] fetch User Failure',
  props<{ error: any }>()
);
