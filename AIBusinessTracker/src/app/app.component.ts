import { Component, OnInit } from '@angular/core';
import { OwnerService } from './services/owner.service';
import { BusinessOwner } from './models/owner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AIBusinessTracker';
  message: any;
  username: string;
  password: string;
  storeName: string;
  location: string;
  userId: any;

  guest: boolean;
  login: boolean;
  register: boolean;
  business: boolean;
  peopleInside: number;
  waitTime: number;

  allowners: any;
  updateOwner: BusinessOwner;
  constructor(public ownerService: OwnerService) {
  }

  ngOnInit() {
    this.guest = false;
    this.login = true;
    this.register = false;
    this.business = false;
    setTimeout(() => {
      this.getOwners();
    });
  }

  getOwners() {
    this.ownerService.getAllOwners().subscribe(res => {
      this.allowners = res;
    });
  }

  updateDB() {
    this.updateOwner.insidePeople = this.peopleInside;
    this.updateOwner.waitTime = this.waitTime;
    this.ownerService.updateInsidePeople(this.userId, this.updateOwner);
  }

  loginOwner() {
    this.business = this.allowners.some(element => {
      return this.username === element.payload.doc.data().username && element.payload.doc.data().password === this.password;
    });
    if (this.business) {
      const userobj = this.allowners.filter(element => {
        return this.username === element.payload.doc.data().username && element.payload.doc.data().password === this.password;
      });
      this.userId = userobj[0].payload.doc.id;
      this.updateOwner = userobj[0].payload.doc.data();
      this.peopleInside = this.updateOwner.insidePeople;
      this.waitTime = this.updateOwner.waitTime;
      // this.message = 'User not registered yet';
      // console.log('Login Successfully');
    } else {
      this.message = 'User not registered yet';
      // console.log('User Data Not available');
    }
  }
  registerOwner() {
    let owner = {};
    owner['username'] = this.username;
    owner['password'] = this.password;
    owner['storeName'] = this.storeName;
    owner['location'] = this.location;
    owner['insidePeople'] = 0;
    owner['waitTime'] = 0;
    this.message = this.ownerService.createOwner(owner);
    this.username = '';
    this.password = '';
    this.location = '';
    this.storeName = '';
  }
}
