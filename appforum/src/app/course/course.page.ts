import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../_services/user.service';
import { TokenService } from '../_services/token.service';
import { CourseService } from '../_services/course.service';
import { ICourse } from '../_interfaces/course';
import { ITokenPayload } from '../_interfaces/token';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  isAdmin: boolean = false;
  username: string = '';
  message_error!: string | null;
  searchCourse: string = '';
  message: string = '';
  idUser!: number;
  position: any = null;

  //initialisation variable avec interfaces
  decodedToken: ITokenPayload = {
    idUser: 0,
    isAdmin: false,
    username: '',
    iat: 1,
    exp: 2
  }

  courses: ICourse[] = [];

  constructor(private courseservice: CourseService,
    private tokenservice: TokenService,
    private activatedroute: ActivatedRoute,
    private userservice: UserService,
    private router: Router) { }

  //cycle de vie de la page 
  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.activatedroute.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.searchCourse = search;
        this.searchCourseAPI();
      }
    });
    this.isAdmin = this.tokenservice.isAdmin();
    this.courseservice.getListCourses().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.courses = data;
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;


          if (errorMessage == "Unauthorized") {
            this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }
        }
      }
    )

    this.userservice.getUserById(this.idUser).subscribe(
      data => {
        this.username = data.username;
      }
    )
  }



  deleteCourse(idCourse: number) {
    this.courseservice.deleteCourse(idCourse).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.courseservice.getListCourses().subscribe(
            (data) => {
              console.log(data),
                this.courses = data;
            },
            err => {
              console.log(err)
            }
          )
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;


          if (errorMessage == "Unauthorized") {
            this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }

          if (errorMessage == "Course not found") {
            this.message_error = "Aucun cours trouvé";
          }
        }
      }
    )
  }

  onSelect(idCourse: number) {
    this.router.navigate(['/post'], { queryParams: { idCourse: idCourse } });
  }

  searchCourseAPI() {
    this.courseservice.filterCourse(this.searchCourse).subscribe(
      data => {
        if (data) {
          this.courses = data;
        }

      },
      err => {
        console.log(err);
      }
    );
    this.router.navigateByUrl('/course?search=' + this.searchCourse);
  }

  onSearchChange(): void {
    if (this.searchCourse === '') {
      this.courseservice.getListCourses().pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        (data) => {
          console.log(data),
            this.courses = data;
        },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;


            if (errorMessage == "Unauthorized") {
              this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
              console.log(this.message_error)
            }
          }
        }
      )
    }
  }

  homePage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/course']);
    });
  }

  editUser() {
    console.log(this.idUser)
    this.router.navigate(['/user/edit/', this.idUser])
  }

  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['/login']);
  }



}
