import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(public authService: AuthService,
              private _snackBar: MatSnackBar,
              private location: Location) {
  }

  ngOnInit(): void {
  }

  loginMessage() {
    this._snackBar.open(this.authService.loginMessage, "Zamknij", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
      .then(() => {
        this.loginMessage();
        this.location.back();
      })
      .catch(() => this.loginMessage());
  }

  ngOnDestroy(): void {
    this.authService.loginMessage = "";
  }
}
