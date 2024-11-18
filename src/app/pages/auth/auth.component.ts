import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthResponceData, AuthService } from './auth.service';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email
    const password = form.value.password

    let authObs: Observable<AuthResponceData>

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    //share the code and reduse -> DRY "duplication is evil"
    authObs.subscribe({
      next: resData => { //next: Handles successful responses from the observable.
        console.log(resData);
        this.isLoading = false;
      },
      error: errorMessage => { //error: Handles any errors that occur during the observable's lifecycle.
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => { //complete: Optionally handles the completion of the observable. You can omit this if not needed.
        console.log('Signup process completed');
      }
    })
    form.reset();
  }
}
