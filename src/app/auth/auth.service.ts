import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { AuthLogin } from './auth-login.model';
import { environment } from '../../environments/environment';
const backendUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private userId: string;
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }
  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }
  // musteriler için kullanılacak
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }

  createUser(name: string, surname: string, email: string, password: string, phoneNumber: string) {
    const authData: AuthData = { name, email, password, surname, phoneNumber};
    this.http
    .post(backendUrl + '/users/register', authData)
    .subscribe(() => {
      this.router.navigate(['/login']);
      },
      error => {
      this.authStatusListener.next(false);
    }
    );
  }

  loginUser(email: string, password: string) {
    const authLogin: AuthLogin = { email, password};
    this.http.post<{token: string, expiresIn: number, userId: string}>
    (backendUrl + '/users/login', authLogin)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        this.userId = response.userId;
        const expiresInDuration = response.expiresIn;
        this.tokenTimer = this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  setAuthTimer(duration: number) {
    setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  logoutUser() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
