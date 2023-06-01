import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredential } from '../_interfaces/credential';
import { IToken } from '../_interfaces/token';
import { Observable } from 'rxjs';
import { IResponseRegister, IUser } from '../_interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }

  login(credentials: ICredential): Observable<IToken> {
    return this.http.post<IToken>(this.baseUrl + '/login', credentials)
  }

  register(data: IUser): Observable<IResponseRegister> {
    return this.http.post<IResponseRegister>(this.baseUrl + '/user', data)
  }


}