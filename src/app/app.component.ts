import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBN7ONMQWmS_C1Xtrj2p-ov_4bMmhc0Z4k",
      authDomain: "ng-recipes-bf43b.firebaseapp.com",
    })
  }

}
