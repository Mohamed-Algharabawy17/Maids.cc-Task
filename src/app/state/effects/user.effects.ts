import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUser,
  fetchUserSuccess,
  fetchUsersFailure,
  fetchUserFailure,
} from '../actions/user.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      mergeMap((action) => {
        return this.userService.getUsers(action.page).pipe(
          map((users) => {
            return fetchUsersSuccess({ users: users.data , total_pages: users.total_pages , total: users.total });
          }),
          catchError((error) => {
            return of(fetchUsersFailure({ error }));
          })
        );
      })
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      mergeMap((action) => {
        return this.userService.getUserById(action.id).pipe(
          map((user) => {
            return fetchUserSuccess({ user: user.data });
          }),
          catchError((error) => {
            return of(fetchUserFailure({ error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
