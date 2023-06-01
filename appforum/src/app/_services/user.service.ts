import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }

  getUserById(idUser: number): Observable<IUser> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IUser>(this.baseUrl + '/user/' + idUser, { "headers": headers })
  }

  getAllUsers(): Observable<IUser[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IUser[]>(this.baseUrl + '/users', { "headers": headers })
  }

  deleteUserById(idUser: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.baseUrl + '/user/' + idUser, { "headers": headers })
  }

  editUser(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/user/admin/' + user.idUser, user, { "headers": headers })
  }

  editProfil(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/user/' + user.idUser, user, { "headers": headers })
  }

  //search course
  filterUser(username: string): Observable<IUser[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    const body = { username: username };
    return this.http.post<IUser[]>(`${this.baseUrl}/user/search`, body, { "headers": headers }).pipe(
      map((users: IUser[]) => users.filter(user => user.username.toLowerCase().startsWith(username.toLowerCase()))) // explain
    )
  }

  getAllUsersCourse(idCourse: number): Observable<IUser[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IUser[]>(this.baseUrl + '/course/' + idCourse + '/users', { "headers": headers })
  }
}
