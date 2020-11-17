import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { BusinessOwner } from '../models/owner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  message: any;
  username: string;
  password: string;
  storeName: string;
  location: string;
  constructor(private owner: OwnerService, private router: Router) { }

  ngOnInit() {
  }

  registerOwner() {
    let owner = {};
    owner['username'] = this.username;
    owner['password'] = this.password;
    owner['storeName'] = this.storeName;
    owner['location'] = this.location;
    owner['insidePeople'] = 0;
    owner['waitTime'] = 0;
    owner['totalTime'] = 0;
    owner['webIn'] = 0;
    owner['maxCapacity'] = 1;
    this.message = this.owner.createOwner(owner);
    this.username = '';
    this.password = '';
    this.location = '';
    this.storeName = '';

    this.router.navigate(['/login']);
  }
}
