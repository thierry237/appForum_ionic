import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../_interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }

  getListPostCourse(idCourse: number): Observable<IPost[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IPost[]>(this.baseUrl + '/course/' + idCourse + '/posts', { "headers": headers })
  }

  addPost(post: IPost): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(this.baseUrl + '/post', post, { "headers": headers })
  }

  deletePost(idPost: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.baseUrl + '/post/' + idPost, { "headers": headers })
  }

  getPostById(idPost: number): Observable<IPost> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IPost>(this.baseUrl + '/post/' + idPost, { "headers": headers })
  }

  editPost(post: IPost): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/post/' + post.idPost, post, { "headers": headers })
  }

}
