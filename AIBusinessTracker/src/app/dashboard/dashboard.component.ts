import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private owner: OwnerService) { }

  ngOnInit() {
    if(this.owner.allBusinessOwners === undefined) {
      this.getOwners();
    } else {
      console.log('Dashboard Data already loaded');
    }
  }

  getOwners() {
    this.owner.getAllOwners().subscribe(res => {
      this.owner.allBusinessOwners = res;
    });
  }

}
