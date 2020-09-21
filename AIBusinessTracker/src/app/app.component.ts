import { Component } from '@angular/core';
import { OwnerService} from './services/owner.service';
import { BusinessOwner } from './models/owner'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AIBusinessTracker';
  message: any;
  username: String;
  password: String;
  storeName: String;
  location: String;

  guest: boolean;
  login: boolean;
  register: boolean;
  business: boolean;
  peopleInside: number;

  allowners: any;
  
  
  constructor(public ownerService: OwnerService) {
  }

  ngOnInit() {
    this.guest = false;
    this.login = true;
    this.register = false;
    this.business = false;
    setTimeout(() => {
      this.getOwners();
    })
  }

  getOwners() {
    this.ownerService.getAllOwners().subscribe(res => {
      console.log(res);
      this.allowners = res;
    })
  }

  updateDB() {
    this.ownerService.updateInsidePeople(this.username,this.storeName,this.location,this.peopleInside);
  }

  loginOwner() {
    this.business = this.allowners.some(element => {
      return this.username === element.payload.doc.data().username && element.payload.doc.data().password === this.password;
    });
    // console.log(this.business);
    // console.log("Login Successfully");
  }
  registerOwner() {
    let owner = {};
    owner['username'] = this.username;
    owner['password'] = this.password;
    owner['storeName'] = this.storeName;
    owner['location'] = this.location;
    
    this.message = this.ownerService.createOwner(owner);
    this.username = '';
    this.password = '';
    this.location = '';
    this.storeName = '';
   
  }
}
