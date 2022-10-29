import {Component, OnInit} from '@angular/core';
import {AuthService} from "./Services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleService} from "./Services/role.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(public authService: AuthService,
              public roleService: RoleService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }
}
