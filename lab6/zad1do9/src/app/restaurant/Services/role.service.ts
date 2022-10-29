import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Roles} from "../Interfaces/roles";
import {Users} from "../Interfaces/users";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Roles = {
    client: false,
    manager: false,
    admin: false
  };
  users: Users[] = [];
  loggedOut: boolean = true;
  userRoles: { [key: string]: string[] } = {};
  userRolesObj: { [key: string]: Roles } = {};
  userBanStatus: { [key: string]: boolean } = {};
  roleMessage: string = "";

  constructor(public auth: AngularFireAuth,
              private db: AngularFirestore) {
  }

  setRole(uid: string, role: string) {
    const userRole: Roles = this.userRolesObj[uid];
    userRole[role as keyof Roles] = !userRole[role as keyof Roles];
    return this.db.doc(`users/${uid}`).update({roles: userRole})
      .then(() => this.roleMessage = "Rola została zmieniona!")
      .catch((e) => this.roleMessage = "Rola nie została zmieniona: " + e);
  }

  getRoles(user: User | null | undefined) {
    this.db.doc(`users/${user!.uid}`).valueChanges()
      .subscribe(({roles}: any) => {
        this.roles = roles;
      });
  }

  checkRoles(allowedRoles: string[]) {
    if (!this.loggedOut) {
      for (let role of allowedRoles) {
        if (this.roles[role as keyof Roles]) return true
      }
    }
    return false;
  }

  canViewDishDetails() {
    return this.checkRoles(["client", "manager", "admin"]);
  }

  canRateDishes() {
    return this.checkRoles(["client", "admin"]);
  }

  canReviewDishes() {
    return this.checkRoles(["client", "manager", "admin"]);
  }

  canViewAdminView() {
    return this.checkRoles(["admin"]);
  }

  canViewDishesManager() {
    return this.checkRoles(["manager", "admin"]);
  }

  canViewCart() {
    return this.checkRoles(["client", "manager", "admin"]);
  }

  canOrder() {
    return this.checkRoles(["client", "manager", "admin"]);
  }

  getAllUsers() {
    this.db.collection<Users>("users").valueChanges().subscribe(users => {
      this.users = users;
      this.getAllUserRoles();
    })
  }

  getAllUserRoles() {
    for (let user of this.users) {
      this.userRoles[user.uid] = [];
      this.userRolesObj[user.uid] = user.roles;
      this.userBanStatus[user.uid] = user.banned;
      for (let role of Object.keys(user.roles)) {
        if (user.roles[role as keyof Roles]) this.userRoles[user.uid].push(role);
      }
    }
  }

  changeBanStatus(uid: string) {
    const changedBanStatus: boolean = !this.userBanStatus[uid];
    this.userBanStatus[uid] = changedBanStatus;
    return this.db.doc(`users/${uid}`).update({banned: changedBanStatus});
  }
}
