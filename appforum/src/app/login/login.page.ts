import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { ICredential } from '../_interfaces/credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title = 'appForum';
  email_error!: string | null;
  password_error!: string | null;


  form: ICredential = {
    email: '',
    password: ''

  }
  constructor(
    private tokenservice: TokenService,
    private authservice: AuthService) { }


  ngOnInit(): void {

  }

  clearPasswordError() {
    this.password_error = null;
  }



  onSubmit(): void {
    this.email_error = null,
      this.password_error = null,
      this.authservice.login(this.form).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        data => {
          console.log(data),
            this.tokenservice.saveToken(data.token)
        },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;


            if (errorMessage == "user doesnt exist (check your email)") {
              this.email_error = "e-mail incorrect"
            }
            if (errorMessage == "incorrect password") {
              this.password_error = "mot de passe incorrect"

            }

          }
        }
      );
  }

}
