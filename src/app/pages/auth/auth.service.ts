import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export interface AuthResponceData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string,): Observable<AuthResponceData> {
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI8GNmADn_WvfEDUbFonrzxlMDNBUHXCk',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handeleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI8GNmADn_WvfEDUbFonrzxlMDNBUHXCk',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handeleError));
  }
  private handeleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error accurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage)); // Ensure an observable is returned
    }
    console.log(errorRes);

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already in use!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User email or password are incorrect!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'User email or password are incorrect!';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'User email or password are incorrect!';
        break;
    }
    return throwError(() => new Error(errorMessage)); // Correctly return an observable ?? cna remove Error I dont want to desplay 
  }
}
