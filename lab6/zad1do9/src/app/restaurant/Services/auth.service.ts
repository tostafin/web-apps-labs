import {Injectable} from '@angular/core';
import {Credentials} from "../Interfaces/credentials";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {Observable, of} from "rxjs";
import User = firebase.User;
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Users} from "../Interfaces/users";
import {RoleService} from "./role.service";
import { switchMap } from 'rxjs/operators';
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.auth.authState;
  logged: boolean = false;
  username: string | null | undefined = "";
  user!: User | null | undefined;
  userObs$!: Observable<Users | null | undefined>;
  userRatedDishes: string[] = [];
  userReviewedDishes: string[] = [];
  userPrevOrders!: [ { [key: string]: [number, number, number] } ];
  registerMessage: string = "";
  loginMessage: string = "";
  logoutMessage: string = "";
  currPersistence: string = "";
  persistenceMessage: string = "";

  constructor(public auth: AngularFireAuth,
              private db: AngularFirestore,
              public roleService: RoleService) {

    this.getUserObs();

    this.auth.authState.subscribe(auth => {
        if (auth) {
          this.user = auth;
          this.logged = true;
          this.roleService.getRoles(auth);
          this.roleService.loggedOut = false;
          this.getUsername(auth);
          this.getPersistence();
        } else {
          this.logged = false;
          this.roleService.loggedOut = true;
          this.user = null;
          this.userObs$ = of(null);
          this.username = "";
        }
      }
    )
  }

  getUserObs() {
    this.userObs$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<Users>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    )
  }

  login({email, password}: Credentials) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(credentials => {
        this.getUsername(credentials.user);
        this.loginMessage = "Zalogowano!"
        this.getUserObs();
      })
      .catch(error => this.loginMessage = "Nie udało się zalogować: " + error);
  }

  register({username, email, password}: Credentials) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        this.registerUserInDB(credentials.user, username);
        this.registerMessage = "Twoje konto zostało zarejstrowane!"
        this.getUserObs();
      })
      .catch(error => this.registerMessage = "Nie udało się zarejestrować twojego konta: " + error);
  }

  logout() {
    return this.auth.signOut();
  }

  getPersistence() {
    this.db.doc("settings/persistence").valueChanges().subscribe((persistence: any) => {
      this.currPersistence = persistence.persistence;
      return this.auth.setPersistence(this.currPersistence);
    })
  }

  setPersistence(persistence: string) {
    this.db.doc("settings/persistence").update({persistence: persistence})
      .catch((e) => this.persistenceMessage = "Nie udało sie zmienić trybu persystencji na " + persistence + ": " + e);
    this.currPersistence = persistence;
    return this.auth.setPersistence(persistence)
      .then(() => this.persistenceMessage = "Ustawiono tryb persystencji na " + persistence + ".")
      .catch((e) => this.persistenceMessage = "Nie udało sie zmienić trybu persystencji na " + persistence + ": " + e);
  }

  registerUserInDB(user: any, username: string) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      username: username,
      roles: {
        client: true,
        manager: false,
        admin: false
      },
      banned: false,
      currOrders: {},
      prevOrders: [],
      ratedDishes: [],
      reviewedDishes: []
    }
    userRef.set(data, {merge: true});
    this.username = username;
  }

  getUsername(user: any) {
    this.db.doc(`users/${user.uid}`).valueChanges()
      .subscribe(({username}: any) => {
        this.username = username;
      });
  }

  addUserRating(dishName: string) {
    this.db.doc(`users/${this.user?.uid}`).update({
      ratedDishes: firestore.FieldValue.arrayUnion(dishName)
    })
  }

  getUserRatedDishes() {
    this.db.doc(`users/${this.user?.uid}`).valueChanges().subscribe(({ratedDishes}: any) => {
      this.userRatedDishes = ratedDishes;
    })
  }

  addUserReview(dishName: string) {
    this.db.doc(`users/${this.user?.uid}`).update({
      reviewedDishes: firestore.FieldValue.arrayUnion(dishName)
    })
  }

  getUserReviewedDishes() {
    this.db.doc(`users/${this.user?.uid}`).valueChanges().subscribe(({reviewedDishes}: any) => {
      this.userReviewedDishes = reviewedDishes;
    })
  }

  getPrevOrders() {
    this.db.doc(`users/${this.user?.uid}`).valueChanges().subscribe(({prevOrders}: any) => {
      this.userPrevOrders = prevOrders;
    })
  }

  checkPrevOrders(currDishName: string) {
    for (let order of this.userPrevOrders) {
      for (let dishName of Object.keys(order)) {
        if (currDishName === dishName) return true;
      }
    }
    return false;
  }
}
