import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { fetchUsers } from '../../state/actions/user.action';
import {
  selectUserError,
  selectUsers,
  selectUserStatus,
  selectTotalPages,
  selectTotalUsers,
} from '../../state/selectors/user.selector';
import { AppState } from '../../models/appState.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    MatCardModule,
    MatPaginatorModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]> = this.store.select(selectUsers);
  totalPages$: Observable<number> = this.store.select(selectTotalPages);
  totalUsers$: Observable<number> = this.store.select(selectTotalUsers);
  loading$: Observable<boolean> = this.store.pipe(
    select(selectUserStatus),
    map((status) => status === 'loading')
  );
  error$ = this.store.pipe(select(selectUserError));
  pageSize = 6;
  pageIndex = 0;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(fetchUsers({ page: this.pageIndex + 1 }));
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.store.dispatch(fetchUsers({ page: this.pageIndex + 1 }));
  }

  viewUserDetails(userId: number) {
    this.router.navigate([`/user/${userId}`]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
