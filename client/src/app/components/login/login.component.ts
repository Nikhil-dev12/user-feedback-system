import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { NavigationService } from 'src/app/services/auth/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isRegistering = false;
  isSubmitting = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.isRegistering) {
      this.register();
    } else {
      this.login();
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isSubmitting = true;

    this.authService.login(username, password)
      .pipe(
        finalize(() => this.isSubmitting = false)
      )
      .subscribe({
        next: (response) => {
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000
          });
          this.dialogRef.close(response.user);
        },
        error: (error) => {
          let errorMessage = 'Invalid credentials';
          if (error.status === 400) {
            errorMessage = 'Username or password incorrect';
          } else if (error.status === 500) {
            errorMessage = 'Server error, please try again later';
          }
          
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }
  register() {
    if (this.registerForm.invalid) {
      return;
    }
  
    const { username, password } = this.registerForm.value;
    this.authService.signup(username, password).subscribe({
      next: (response) => {
        console.log("Registration successful:", response);
        
        // Show success message
        this.snackBar.open("Registration successful! Please log in.", "success");
  
        // Switch to login form
        this.isRegistering = false;
      },
      error: (error) => {
        console.error("Registration error:", error);
        
        // Show error message if username already exists
        if (error.status === 400) {
          this.snackBar.open("Username already exists. Try another one.", "error");
        } else {
          this.snackBar.open("Something went wrong. Please try again.", "error");
        }
      }
    });
  }
  
}