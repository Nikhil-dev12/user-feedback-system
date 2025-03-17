import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private dialog: MatDialog, private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px', 
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle what happens after dialog closes if needed
    });
  }

  logout(): void {
    this.authService.logout();
  }
  openFeedbackDialog() {
    const dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '440px',
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The feedback dialog was closed');
    });
  }
  
}
