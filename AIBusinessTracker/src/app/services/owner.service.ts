import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(public firebase: AngularFirestore) { }

  getAllOwners(): any {
    return this.firebase.collection('BusinessOwners').snapshotChanges(); 
  }

  createOwner(owner): any {
    this.firebase.collection('BusinessOwners').add(owner).then(res => {
      return "Employee Registered Successfully"
      console.log(res);
    }).catch(error =>  {
      return error;
    });
  }

  updateInsidePeople(username,storeName,location,insidePeople) {
    let waitTime = insidePeople * 2;
    this.firebase.collection('users').doc(username).set({
      // 'password': owner.password,
      'storeName': 'Patel',
      'location': 'Chicago',
      'peopleInside': insidePeople,
      'waitTime': waitTime
    })
  }
}
