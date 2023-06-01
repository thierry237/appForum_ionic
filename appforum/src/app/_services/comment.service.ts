import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../_interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  baseUrl: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }



  getComments(idPost: number): Observable<IComment[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IComment[]>(this.baseUrl + '/post/' + idPost + '/comments', { "headers": headers })
  }

  addComment(comment: IComment): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(this.baseUrl + '/comment', comment, { "headers": headers })
  }

  deleteComment(idComment: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.baseUrl + '/comment/' + idComment, { "headers": headers })
  }


  getCommentById(idComment: number): Observable<IComment> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<IComment>(this.baseUrl + '/comment/' + idComment, { "headers": headers })
  }


  editComment(comment: IComment): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<any>(this.baseUrl + '/comment/' + comment.idComment, comment, { "headers": headers })
  }
}
