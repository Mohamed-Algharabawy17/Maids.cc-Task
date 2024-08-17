import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class HeaderComponent {
  constructor(private router: Router, private toastService: ToastService) {}

  onSearch(event: any) {
    const userId = event.target.value;
    if (userId >= 1 && userId <= 12) {
      this.router.navigate(['/user', userId]);
    } else {
      this.toastService.showToastMessage('Please enter a valid user ID between 1 and 12');
      this.router.navigate(['/']);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
