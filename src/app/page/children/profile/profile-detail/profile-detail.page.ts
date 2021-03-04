import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})

export class ProfileDetailPage implements OnInit {

  
  child = [];
  id: any;
  name: string;
  FATHERNAME: string;
  MOTHERNAME: string;
  fatheric : string;
  motheric: string;
  parentname: string;
  ownic: string;
  childic: string;



  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    public alertController: AlertController,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
  
    this.id = this.route.snapshot.params.id;

    this.authService.read_children_details(this.id).subscribe(data => {
      this.child = [];
      this.childic =  data.payload.data()['ic'];
      this.name = data.payload.data()['name'].toUpperCase();
      var race = "";
      var religion = "";
      this.fatheric = data.payload.data()['fatheric'];
      this.motheric = data.payload.data()['motheric'];

      console.log(this.fatheric);
      this.authService.read_profile(this.motheric).subscribe(doc=>{
        this.MOTHERNAME = doc.payload.data()["name"].toUpperCase();
     });


     this.authService.read_profile(this.fatheric).subscribe(doc1=>{
      this.FATHERNAME = doc1.payload.data()["name"].toUpperCase();
   });




      if(this.childic == ""|| this.childic == null || this.childic == undefined){
        this.childic = "-";
      }else{
        this.adminService.read_citizen_details(this.childic).subscribe(data=>{
            race = data.payload.data()["race"];
            religion = data.payload.data()["religion"];
        })
      }

      if(race == "" || race == null || race == undefined){
        race = "-";
      }
      if(religion == "" || religion == null || religion == undefined){
        religion = "-";
      }
    
      var details = 
      {
        IC: this.childic,
        NAME: this.name.toUpperCase(),
        BIRTHCERNO: this.id.toUpperCase(),
        GENDER: data.payload.data()['gender'],
        RELIGION: religion,
        RACE: race,
        BDATE: data.payload.data()["birthdate"],
        IMAGE: data.payload.data()["picture"],
      
      };

      this.child.push(details);

    })
  }
  }
