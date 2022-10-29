import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)])
  });

  constructor(public authService: AuthService,
              private _snackBar: MatSnackBar,
              private location: Location) {
  }

  ngOnInit(): void {
  }

  registerMessage() {
    this._snackBar.open(this.authService.registerMessage, "Zamknij", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value)
      .then(() => {
        this.registerMessage();
        this.location.back();
      })
      .catch(() => this.registerMessage());
  }

  ngOnDestroy(): void {
    this.authService.registerMessage = "";
  }
}
