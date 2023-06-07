import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CourseService } from '../_services/course.service';
import { PostService } from '../_services/post.service';
import { IPost } from '../_interfaces/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  idCourse!: string | null;
  ajoutValide: boolean = false;
  message_auth!: string | null;
  post: IPost = {
    title: '',
    message: ''
  }
  constructor(private postservice: PostService,
    private activatedroute: ActivatedRoute,
    private courseservice: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    this.idCourse = this.activatedroute.snapshot.queryParamMap.get('idCourse')
    if (this.idCourse)
      this.post.idCourse = parseInt(this.idCourse)

    if (this.idCourse)
      this.courseservice.getCourseById(parseInt(this.idCourse)).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        data => {
          if (!data) {
            this.router.navigate(['/course']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;


            if (errorMessage == "Unauthorized") {
              this.message_auth = "Session terminée! veuillez vous reconnecter de nouveau";
              console.log(this.message_auth)
            }
          }
        }
      )
  }

  onSubmit() {
    this.postservice.addPost(this.post).subscribe(
      data => {
        console.log(data);
        this.ajoutValide = true
      },
      err => {
        console.log(err)
      }
    )
  }

  returnListPost() {
    this.router.navigate(['/post'], { queryParams: { idCourse: this.idCourse } });
  }

}
