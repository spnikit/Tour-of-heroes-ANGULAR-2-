import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

    token;

    constructor(private router: Router) {

    }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                resp => console.log('signed up')
            )
            .catch(
                (err) => console.log(err)
            );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                resp => {
                    return firebase.auth().currentUser.getIdToken()
                }
            )
            .then(
                (token: string) => {
                    this.token = token;
                    this.router.navigate(['/']);
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                token => {

                    console.log('token fetched!')
                    this.token = token
                }
            )

        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}