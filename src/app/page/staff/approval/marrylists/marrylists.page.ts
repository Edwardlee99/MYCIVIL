import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { mapproveList } from 'src/app/models/approve';
import { ProcessService } from 'src/app/service/process.service';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-marrylists',
  templateUrl: './marrylists.page.html',
  styleUrls: ['./marrylists.page.scss'],
})
export class MarrylistsPage implements OnInit {
  type: string;
  idtype: string;
  status: string;
  approves: any;
  manemail: string;
  womanemail: string;
  mantelno: string;
  womantelno: string;
  term = '';
  constructor(

    private route: ActivatedRoute,
    private processService: ProcessService,
    private router: Router 
  ) { }

  ApproveListArray: mapproveList[] = [];

  options: Fuse.IFuseOptions<mapproveList> = {
    keys: [
      { name: 'WOMANNAME', weight: 0.2 },
      { name: 'MANNAME', weight: 0.2 },
      { name: 'WOMANIC', weight: 0.1 },
      { name: 'MANIC', weight: 0.1 },
      { name: 'WOMANEMAIL', weight: 0.1 },
      { name: 'MANEMAIL', weight: 0.1 },
      { name: 'STATUSDATE', weight: 0.1 },
      { name: 'STARTDATE', weight: 0.1 },
      { name: 'MANTELNO', weight: 0.1 },
      { name: 'REFNO', weight: 0.1 }
    ]
  };

  ngOnInit() {
    this.idtype = this.route.snapshot.params.id;
    this.status = this.route.snapshot.params.id2;
    this.type = "Register Marriage";

    this.processService.read_approve_list(this.idtype,this.status).subscribe( doc=>{
      this.approves = doc.map(e=>{    
        this.manemail = e.payload.doc.data()["manemail"];
        this.womanemail = e.payload.doc.data()["womanemail"];
        this.mantelno = e.payload.doc.data()["manphone"];
        this.womantelno = e.payload.doc.data()["womanphone"];
        if(this.manemail == ""){
          this.manemail = "-";
        };
        if(this.womanemail == ""){
          this.womanemail = "-";
        };
        if(this.womantelno == ""){
          this.womantelno = "-";
        };
        if(this.mantelno == ""){
          this.mantelno = "-";
        };
        
        return{
          ID: e.payload.doc.id,
          MANNAME: e.payload.doc.data()["manname"],
          WOMANNAME: e.payload.doc.data()["womanname"],
          MANIC: e.payload.doc.data()["manic"],
          WOMANIC: e.payload.doc.data()["womanic"],
          WOMANEMAIL: this.womanemail,
          MANTELNO: this.mantelno,
          MANEMAIL: this.manemail,
          WOMANTELNO: this.womantelno,
          STARTDATE: e.payload.doc.data()["startdate"],
          STATUSDATE: e.payload.doc.data()["statusdate"],
          REFNO: e.payload.doc.data()["refno"]
        }
      })
        this.ApproveListArray.push(this.approves);
    })
  }



  navigateToApprDetails(item){
    this.router.navigate([`/approval/details/${this.idtype}/${this.status}/${item}/`]);
  }

}
