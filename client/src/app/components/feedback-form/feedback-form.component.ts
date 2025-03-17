import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  private apiUrl: string = 'http://localhost:8090/api/feedback/auth/submit';
  feedbackForm: FormGroup;
  feedbackText: string = '';
  currentDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService, 
    public dialogRef: MatDialogRef<FeedbackFormComponent> 
  ) {
    this.feedbackForm = this.fb.group({
      feedback: ['', [Validators.required, Validators.minLength(5)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
  submitFeedback() {
    if (this.feedbackForm.valid) {
      const {feedback, rating} = this.feedbackForm.value;
      console.log('Feedback Submitted:', this.feedbackText);
      console.log('Submitted on:', this.currentDate);

      this.authService.submitFeedback(feedback,rating).subscribe({
        next:()=> {
          console.log('Feedback Submitted', this.feedbackForm.value);
        this.snackBar.open('Thank you for your feedback!', 'Close', { duration: 3000 });
        this.dialogRef.close(); // ✅ Close the dialog after submission
        this.feedbackForm.reset({ rating: 5 });
        },
        error: err => {
          console.error('Error submitting feedback:', err);
          this.snackBar.open('Failed to submit feedback. Try again.', 'Close', { duration: 3000 });
        }
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
