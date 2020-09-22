import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import { BusinessOwner } from '../models/owner'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  business: any;
  userId: any;
  username: string;
  password: string;
  message: string;
  peopleInside: number;
  waitTime: number;

  updateOwner: BusinessOwner;

  user: BusinessOwner;
  constructor(private router: Router, private owner: OwnerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getOwners();
    });
  }

  getOwners() {
    this.owner.getAllOwners().subscribe(res => {
      this.owner.allBusinessOwners = res;
    });
  }

  loginOwner() {
    this.business = this.owner.allBusinessOwners.some(element => {
      return this.username === element.payload.doc.data().username && element.payload.doc.data().password === this.password;
    });
    if (this.business) {
      const userobj = this.owner.allBusinessOwners.filter(element => {
        return this.username === element.payload.doc.data().username && element.payload.doc.data().password === this.password;
      });
      this.owner.userId = userobj[0].payload.doc.id;

      this.owner.user = userobj[0].payload.doc.data();
      // this.updateOwner = userobj[0].payload.doc.data();
      this.peopleInside = this.owner.user.insidePeople;
      this.waitTime = this.owner.user.waitTime;
      this.router.navigate(['/business']);
    } else {
      this.message = 'User not registered yet';
    }
  }
}
