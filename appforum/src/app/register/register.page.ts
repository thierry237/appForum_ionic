import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { IUser } from '../_interfaces/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('inscriptionForm') inscriptionForm: NgForm | undefined;
  title = "appForum";
  email_error!: string | null;
  username_error!: string | null;
  inscriptionValide: boolean = false;

  form: IUser = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  }


  constructor(private authservice: AuthService) { }

  ngOnInit(): void {

  }

  clearEmailError() {
    this.email_error = null;
  }

  clearUsernameError() {
    this.username_error = null;
  }


  onSubmit() {
    this.email_error = null,
      this.authservice.register(this.form).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        data => { console.log(data), this.inscriptionValide = true },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;
            this.inscriptionValide = false;
            console.log(errorMessage);
            if (errorMessage == "email is not correct") {
              this.email_error = "e-mail incorrect"
            }
            if (errorMessage == "email already exists") {
              this.email_error = "email existe déjà"
            }
            if (errorMessage == "wrong username (must be length 3 - 14)") {
              this.username_error = "min 3 et max 14"
            }


          }
        }
      );
  }


}
