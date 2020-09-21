import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
      return 'Employee Registered Successfully';
      // console.log(res);
    }).catch(error => {
      return error;
    });
  }

  updateInsidePeople(docId, people) {
    this.firebase.collection('BusinessOwners').doc(docId).set(people).then(res => {
      console.log('Data updated successfully');
    }).catch(err => {
      console.log('Error while updating DB' + err);
    });
  }
}
