import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { approveList } from 'src/app/models/approve';
import { ProcessService } from 'src/app/service/process.service';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  type: string;
  idtype: string;
  status: string;
  approves: any;
  name: string;
  ic:string;
  term = '';

  ApproveListArray: approveList[] = [];

  options: Fuse.IFuseOptions<approveList> = {
    keys: [
      { name: 'NAME', weight: 0.2 },
      { name: 'IC', weight: 0.1 },
      { name: 'EMAIL', weight: 0.1 },
      { name: 'STATUSDATE', weight: 0.1 },
      { name: 'STARTDATE', weight: 0.1 },
      { name: 'TELNO', weight: 0.1 },
      { name: 'REFNO', weight: 0.1 }
    ]
  };


  constructor(
    private route: ActivatedRoute,
    private processService: ProcessService,
    private router: Router 
  ) { }

  ngOnInit() {

    this.idtype = this.route.snapshot.params.id;
    this.status = this.route.snapshot.params.id2;
    if(this.idtype == "ic-renew"){
      this.type = "Renew Identifcation Cards"
    }else if(this.idtype == "ic-register"){
      this.type = "Register Identifcation Cards"
    }else if(this.idtype == "ic-edit"){
      this.type = "Edit Identifcation Cards"
    }else if(this.idtype == "marry-register"){
      this.type = "Register Marriage"
    }

    this.processService.read_approve_list(this.idtype,this.status).subscribe( doc=>{
      this.approves = doc.map(e=>{
        this.name = e.payload.doc.data()["parentname"];
        this.ic = e.payload.doc.data()["parentic"];
        if(this.name == null || this.name == "" || this.name == undefined){
          this.name = e.payload.doc.data()["name"];
        }
        if(this.ic == null || this.ic == "" || this.ic == undefined){
          this.ic = e.payload.doc.data()["ic"];
        }
        
        return{
          ID: e.payload.doc.id,
          NAME: this.name,
          IC: this.ic,
          EMAIL: e.payload.doc.data()["email"],
          TELNO: e.payload.doc.data()["phone"],
          STARTDATE: e.payload.doc.data()["startdate"],
          STATUSDATE: e.payload.doc.data()["statusdate"],
          REFNO: e.payload.doc.data()["refno"]
        }
      })
        this.ApproveListArray.push(this.approves);
    })
  }

  trackByDate(value: approveList): string {
    return value.STARTDATE;
  }

  navigateToApprDetails(item){
    this.router.navigate([`/approval/details/${this.idtype}/${this.status}/${item}`]);
  }

}
