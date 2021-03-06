import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { AdminService } from 'src/app/service/admin.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  checkRelation = false;
  id: any;
  marryid: string;
  couple = [];




  constructor(
    private authService: AuthService,
    private storage: Storage,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
      //To get role
      this.storage.get('ic')
      .then((val) => {
        this.id = val

      this.authService.read_marry().ref.where("manic", "==" , this.id).where("status", "==", "married").get().then( doc => {
          if(!doc.empty){
            this.couple =[];

            doc.docs.map(e=>{
              var womanic = e.data()['womanic'];
              this.marryid = e.data()["marrycertificate"];
              this.adminService.read_citizen_details(womanic).subscribe( data =>{
                this.couple = [];
                var details = 
                {
                  MARRY: this.marryid,
                  IC: womanic,
                  NAME: data.payload.data()['name'].toUpperCase(),
                  GENDER: data.payload.data()['gender'],
                  RELIGION: data.payload.data()["religion"],
                  RACE: data.payload.data()["race"],
                  BIRTHDATE: data.payload.data()["birthdate"],
                  IMAGE: data.payload.data()["picture"],
                };
               this.couple.push(details);
              })
            },error =>{
              console.log(error);
            })
            
          }else{
            this.authService.read_marry().ref.where("womanic", "==" , this.id).where("status", "==", "married").get().then( doc => {
              this.couple =[];
                if(!doc.empty){
                  this.couple = [];
                doc.docs.map(e=>{
                  var manic = e.data()['manic'];
                  this.marryid = e.data()["marrycertificate"];
                  this.adminService.read_citizen_details(manic).subscribe( data =>{
                    var details = 
                    {
                      MARRY: this.marryid,
                      IC: manic,
                      NAME: data.payload.data()['name'].toUpperCase(),
                      GENDER: data.payload.data()['gender'],
                      RELIGION: data.payload.data()["religion"],
                      RACE: data.payload.data()["race"],
                      BIRTHDATE: data.payload.data()["birthdate"],
                      IMAGE: data.payload.data()["picture"],
                    };
                   this.couple.push(details);
                   this.checkRelation = true;
                  })
                },error =>{
                  console.log(error);
                })
                
              }
              })
          }
        
        
     })

    })

  

  }


}
