import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';

// ✅ Import Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

// ✅ Import Forms and HTTP Modules
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FeedbackFormComponent,
    FeedbackListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule, // ✅ Ensures MatDialog is available
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [], // ✅ DO NOT manually provide MatDialogConfig
  bootstrap: [AppComponent]
})
export class AppModule { }
