import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Feedback {
  id: number;
  rating: number;
  username: string;
  feedbackText: string | null;
  date: string;
}

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: Feedback[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks() {
    this.http.get<Feedback[]>('http://localhost:8090/api/feedback/public/all').subscribe({
      next: (data) => {
        this.feedbackList = data;
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }
}
