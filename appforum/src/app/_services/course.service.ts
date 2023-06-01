import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICourse, IListCourse } from '../_interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }


  //get List courses
  getListCourses(): Observable<ICourse[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<ICourse[]>(this.baseUrl + '/courses', { "headers": headers })
  }

  //edit Course
  updateCourse(course: ICourse): Observable<ICourse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.put<ICourse>(this.baseUrl + "/course/" + course.idCourse, course, { "headers": headers })
  }

  //get one course 
  getCourseById(idCourse: number): Observable<ICourse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<ICourse>(this.baseUrl + '/course/' + idCourse, { "headers": headers })
  }

  //delete course:
  deleteCourse(idCourse: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete(this.baseUrl + '/course/' + idCourse, { "headers": headers })
  }

  //add new course
  addCourse(course: ICourse): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(`${this.baseUrl}/course`, course, { "headers": headers })
  }

  //search course
  filterCourse(name: string): Observable<ICourse[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    const body = { name: name };
    return this.http.post<ICourse[]>(`${this.baseUrl}/course/search`, body, { "headers": headers }).pipe(
      map((courses: ICourse[]) => courses.filter(course => course.name.toLowerCase().startsWith(name.toLowerCase()))) // explain
    )
  }

}


