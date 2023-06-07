import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CourseService } from '../_services/course.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../_interfaces/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
})
export class EditCoursePage implements OnInit {

  message_error!: string | null;
  message_auth!: string | null;
  modificationValide: boolean = false;

  course: ICourse = {
    idCourse: 1,
    name: '',
    description: '',
    createdAt: ''
  }

  constructor(private activatedroute: ActivatedRoute,
    private courseservice: CourseService) { }
  ngOnInit(): void {
    let idCourse = this.activatedroute.snapshot.params['id'];
    this.courseservice.getCourseById(idCourse).subscribe(
      (data) => {
        this.course = data;
        console.log(this.course)
      },
      (error) => {
        console.log(error);
      }
    )

  }

  clearUsernameError() {
    this.message_error = null;
  }

  updateCourse(): void {
    this.courseservice.updateCourse(this.course).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data);
        this.modificationValide = true
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;
          console.log(errorMessage);
          if (errorMessage == "course already exists") {
            this.message_error = "Ce cours existe déjà";
          }

          if (errorMessage == "Unauthorized") {
            this.message_auth = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }
        }
      }
    );

  }
}