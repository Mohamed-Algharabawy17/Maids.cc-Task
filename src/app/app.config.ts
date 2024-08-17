import { ApplicationConfig } from '@angular/core';
import { Action, ActionReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer, UserState } from './state/reducers/user.reducer';
import { UserEffects } from './state/effects/user.effects';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({ user: userReducer as ActionReducer<UserState, Action> }),
    provideEffects([UserEffects]),
    provideStoreDevtools({ maxAge: 30, logOnly: !isDevMode() }),
  ],
};
