import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  citizen = [];
  id: string;
  staff = [];
  citizenRole = false;
  role: string;
  email: string;
  telno: string;

  constructor(
    private router : Router,
    private adminService: AdminService,
    private authService: AuthService,
    private storage: Storage
  ) {}

  ngOnInit() {
     //To get role
     this.storage.get('ic')
     .then((val) => {
       this.id = val
      this.authService.user(val).get().subscribe(doc => {
       this.role = doc.data()['role']
       if(this.role == "Staff"){
         this.citizenRole = false;
         this.adminService.read_staff_details(this.id).subscribe(data => {
          this.staff = [];
           var details = 
           {
             ID: data.payload.id,
             NAME: data.payload.data()['name'].toUpperCase(),
             EMAIL: data.payload.data()['email'],
             IC: data.payload.data()['ic'],
             TELNO: data.payload.data()["phone"],
             ROLE: data.payload.data()["role"],
             IMAGE: data.payload.data()["picture"],
           };
          this.staff.push(details);
          
         });
       }else{
         this.citizenRole = true;
         this.adminService.read_citizen_details(this.id).subscribe(data => {
          this.citizen = [];
           var details = 
           {
             IC: data.payload.id,
             NAME: data.payload.data()['name'].toUpperCase(),
             BIRTHCERNO: data.payload.data()['birthcertificate'].toUpperCase(),
             GENDER: data.payload.data()['gender'],
             RELIGION: data.payload.data()["religion"],
             RACE: data.payload.data()["race"],
             ADDRESS: data.payload.data()["address"],
             CITY: data.payload.data()["city"],
             POSTCODE: data.payload.data()["postcode"],
             BDATE: data.payload.data()["birthdate"],
             STATE: data.payload.data()["state"],
             IMAGE: data.payload.data()["picture"],
           };
          this.citizen.push(details);
         });
         this.authService.read_profile(this.id).subscribe(data => {
          this.email = data.payload.data()['email']
          this.telno = data.payload.data()['phone']
         });
       } })    
        
       error => console.error(error)
     });

  }

  comingFromTabs() {
    if (this.router.url.split('/')[1].split('/')[0] === 'tabs') {
      return true;
    }
    return false;

  }



}

