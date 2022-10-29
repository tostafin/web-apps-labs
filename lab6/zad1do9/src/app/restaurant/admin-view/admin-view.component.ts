import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleService} from "../Services/role.service";
import {DeleteDishDialogComponent} from "../delete-dish-dialog/delete-dish-dialog.component";
import {BanUserDialogComponent} from "../ban-user-dialog/ban-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UnbanUserDialogComponent} from "../unban-user-dialog/unban-user-dialog.component";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  roles: string[] = ["client", "manager", "admin"];

  constructor(public authService: AuthService,
              public roleService: RoleService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.roleService.getAllUsers();
  }

  snackBarMessage(message: string) {
    this._snackBar.open(message, "Zamknij", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  setPersistence(persistence: string) {
    this.authService.setPersistence(persistence)
      .then(() => this.snackBarMessage(this.authService.persistenceMessage))
      .catch(() => this.snackBarMessage(this.authService.persistenceMessage));
  }

  changeUserRole(uid: string, role: string) {
    return this.roleService.setRole(uid, role)
      .then(() => this.snackBarMessage(this.roleService.roleMessage))
      .catch(() => this.snackBarMessage(this.roleService.roleMessage));
  }

  openBanDialog(uid: string) {
    const dialogRef = this.dialog.open(BanUserDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.roleService.changeBanStatus(uid)
        .then(() => this.snackBarMessage("Użytkownik został zbanowany!"))
        .catch(e => this.snackBarMessage("Nie udało się zbanować użytkownika: " + e));
    })
  }

  openUnbanDialog(uid: string) {
    const dialogRef = this.dialog.open(UnbanUserDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.roleService.changeBanStatus(uid)
        .then(() => this.snackBarMessage("Użytkownik został odbanowany!"))
        .catch(e => this.snackBarMessage("Nie udało się odbanować użytkownika: " + e));
    })
  }
}
