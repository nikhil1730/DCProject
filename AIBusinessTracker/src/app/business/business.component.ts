import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  peopleInside: number;
  waitTime: number;

  constructor(private router: Router, private owner: OwnerService) { }

  ngOnInit() {
    if (this.owner.user != undefined) {
      this.peopleInside = this.owner.user.insidePeople;
      this.waitTime = this.owner.user.waitTime;
    } else {
      this.router.navigate(['/**'])
    }
    
  }

  updateDB() {
    this.owner.user.insidePeople = this.peopleInside;
    this.owner.user.waitTime = this.waitTime;
    this.owner.updateInsidePeople(this.owner.userId, this.owner.user);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
