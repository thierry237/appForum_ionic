import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITokenPayload } from '../_interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }
  decodedToken: ITokenPayload = {
    idUser: 0,
    isAdmin: false,
    username: 'admin',
    iat: 1,
    exp: 2
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
    this.router.navigate(['course'])
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token')
    return !!token
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
    return this.decodedToken.isAdmin
  }

  _idUser(): number {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }

    return this.decodedToken.idUser
  }

  getUsername(): string {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
    return this.decodedToken.username
  }

  logout() {
    localStorage.removeItem('token');
  }


}
