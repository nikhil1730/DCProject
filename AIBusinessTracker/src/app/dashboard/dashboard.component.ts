import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchText: string;

  constructor(private router: Router, private owner: OwnerService) { }

  ngOnInit() {
    console.log('ngOnInit()')
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

  SearchFun() {
    if(this.searchText != ""){
      this.owner.allBusinessOwners = this.owner.allBusinessOwners.filter(res=>{
      return (res.payload.doc.data().username.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      res.payload.doc.data().storeName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      res.payload.doc.data().location.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      res.payload.doc.data().insidePeople.toString().includes(this.searchText) ||
      (parseInt(res.payload.doc.data().insidePeople) * parseInt(res.payload.doc.data().waitTime)).toString().includes(this.searchText));});
    }
    else if(this.searchText == ""){
      this.getOwners();
    }
  }
}




