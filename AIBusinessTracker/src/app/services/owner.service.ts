import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BusinessOwner } from '../models/owner'

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  allBusinessOwners: any;
  user: BusinessOwner;
  userId: string;


  constructor(public firebase: AngularFirestore) { }

  getAllOwners(): any {
    return this.firebase.collection('BusinessOwners').snapshotChanges();
  }

  createOwner(owner): any {
    this.firebase.collection('BusinessOwners').add(owner).then(res => {
      return 'Employee Registered Successfully';
    }).catch(error => {
      return error;
    });
  }

  updateInsidePeople(docId, people) {
    this.firebase.collection('BusinessOwners').doc(docId).set(people).then(res => {
    }).catch(err => {
      console.log('Error while updating DB' + err);
    });
  }
}
