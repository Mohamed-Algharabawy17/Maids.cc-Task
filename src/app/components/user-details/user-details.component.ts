import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import {
  selectOneUser,
  selectUserStatus,
} from '../../state/selectors/user.selector';
import { select, Store } from '@ngrx/store';
import { fetchUser } from '../../state/actions/user.action';
import { User } from '../../models/user.model';
import { AppState } from '../../models/appState.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,
  styleUrl: './user-details.component.css',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User | null> = this.store.pipe(select(selectOneUser));
  loading$: Observable<boolean> = this.store.pipe(
    select(selectUserStatus),
    map((status) => status === 'loading')
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.store.dispatch(fetchUser({ id: Number(userId) }));
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
