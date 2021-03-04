import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

   //To check citizen role
   citizenRole = false;

   //Role
   role : string;

  constructor(
    private storage: Storage,
    private authservice: AuthService,
  ) { }

  ngOnInit() {
      //To get role
      this.storage.get('ic')
      .then((val) => {
       
       //Access Level For staff and user
        this.authservice.user(val).get().subscribe(doc => {
        this.role = doc.data()['role']
        

        if(this.role != "Staff"){
          this.citizenRole = true;
        }
        }, error => {
          console.log(error);
        }) 
        error => console.error(error)
      });    


  }

}
