import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js';
import { childrenList } from 'src/app/models/children';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  childs: any;

  userid: string;

  term = '';

  ChildrenListArray: childrenList[] = [];

  options: Fuse.IFuseOptions<childrenList> = {
    keys: [
      { name: 'NAME', weight: 0.2 },
      { name: 'BIRTHDATE', weight: 0.1 },
      { name: 'GENDER', weight: 0.1 },
      { name: 'IC', weight: 0.1 },
      { name: 'BIRTHCERNO', weight: 0.1 }
    ]
  };

  constructor(
    private storage: Storage,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
 

    this.storage.get('ic')
      .then((val) => {
        this.userid = val;
        //Using Father IC To check value
        this.authservice.read_children_father(val).get().subscribe(data => {
          if(data.empty){ //if not exist use mother ic to read value
            //Using mother ic
            this.authservice.read_children_mother(val).snapshotChanges().subscribe( data=>{
              this.childs = data.map(e => {
              return{
                IC: e.payload.doc.data()['ic'],
                NAME: e.payload.doc.data()['name'].toUpperCase(),
                BIRTHCERNO: e.payload.doc.id,
                BIRTHDATE: e.payload.doc.data()['birthdate'],
                GENDER: e.payload.doc.data()['gender'],
                IMAGE: e.payload.doc.data()["picture"],
                
              };
            })
            this.ChildrenListArray.push(this.childs); 
          })
          }else{//if exist use father ic to read value
            this.authservice.read_children_father(val).snapshotChanges().subscribe( data=>{
              this.childs = data.map(e => {
              return{
                IC: e.payload.doc.data()['ic'],
                NAME: e.payload.doc.data()['name'].toUpperCase(),
                BIRTHCERNO: e.payload.doc.id,
                BIRTHDATE: e.payload.doc.data()['birthdate'],
                GENDER: e.payload.doc.data()['gender'],
                IMAGE: e.payload.doc.data()["picture"],
                
              };
            })
            this.ChildrenListArray.push(this.childs); 
          })
          }
       
        });
        
        error => console.error(error)
      });
  }

  navigateToChildrenDetails(birthno) {
    this.router.navigate([`/children-profile/${birthno}`]);
  }

}
