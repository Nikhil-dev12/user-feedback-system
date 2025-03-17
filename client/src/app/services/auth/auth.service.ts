import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NavigationService } from './navigation.service';

export interface User {
  id?: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/api/';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService
  ) {}

  // Sign up new user

  signup(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}user/signup`, { username, password },{ headers: { 'Content-Type': 'application/json' }}).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      catchError(this.handleError)
    );
  }

  // Login existing user
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}user/login`, { username, password }).pipe(
      tap(response => {
        this.handleAuthentication(response); 
      }),
      catchError(this.handleError)
    );
  }

  submitFeedback(feedback: string, rating: number) {
    const url = 'http://localhost:8090/api/feedback/auth/submit';
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = {
      feedbackText: feedback, rating,
      ResponseType: 'text'
    }

    return this.http.post(url, body, { headers });
   
  }
  // submitFeedback(feedback: string, rating: number): Observable<any> {
  //   const url = 'http://localhost:8090/api/feedback/auth/submit'; // Update with your API endpoint
  //   const token = this.getToken(); // Ensure this method retrieves the JWT token
  
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  
  //   const body = {
  //     feedbackText: feedback,  // Ensure this matches the expected backend key
  //     rating: rating.toString() // Ensure rating is sent as a string if required
  //   };
  
  //   return this.http.post(url, body, { headers });
  // }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.navigationService.navigateToHome(); // Redirect to home after logout
  }

  // Get authentication token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Handle authentication response
  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  // Get user from local storage
  private getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null; // If no user is stored, return null safely
    
    try {
      return JSON.parse(user); // Try parsing the JSON
    } catch (error) {
      console.error("Invalid JSON in localStorage for user:", error);
      localStorage.removeItem(this.userKey); // Clear corrupted data
      return null;
    }
  }  

  // Check if token exists
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
