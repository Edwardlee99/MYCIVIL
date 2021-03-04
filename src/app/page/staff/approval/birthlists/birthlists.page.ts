import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { bapproveList } from 'src/app/models/approve';
import { ProcessService } from 'src/app/service/process.service';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-birthlists',
  templateUrl: './birthlists.page.html',
  styleUrls: ['./birthlists.page.scss'],
})
export class BirthlistsPage implements OnInit {

  type: string;
  idtype: string;
  status: string;
  approves: any;
  term = '';
  constructor(

    private route: ActivatedRoute,
    private processService: ProcessService,
    private router: Router 
  ) { }

  ApproveListArray: bapproveList[] = [];

  options: Fuse.IFuseOptions<bapproveList> = {
    keys: [
      { name: 'MOTHERNAME', weight: 0.2 },
      { name: 'FATHERNAME', weight: 0.2 },
      { name: 'MOTHERIC', weight: 0.1 },
      { name: 'FATHERIC', weight: 0.1 },
      { name: 'STATE', weight: 0.1 },
      { name: 'EMAIL', weight: 0.1 },
      { name: 'STATUSDATE', weight: 0.1 },
      { name: 'STARTDATE', weight: 0.1 },
      { name: 'TELNO', weight: 0.1 },
      { name: 'REFNO', weight: 0.1 }
    ]
  };

  ngOnInit() {
    this.idtype = this.route.snapshot.params.id;
    this.status = this.route.snapshot.params.id2;
    this.type = "Register Birth Certificate";

    this.processService.read_approve_list(this.idtype,this.status).subscribe( doc=>{
      this.approves = doc.map(e=>{    
        return{
          ID: e.payload.doc.id,
          FATHERNAME: e.payload.doc.data()["fathername"],
          MOTHERNAME: e.payload.doc.data()["mothername"],
          FATHERIC: e.payload.doc.data()["fatheric"],
          MOTHERIC: e.payload.doc.data()["motheric"],
          EMAIL: e.payload.doc.data()["email"],
          TELNO: e.payload.doc.data()["phone"],
          STARTDATE: e.payload.doc.data()["startdate"],
          STATUSDATE: e.payload.doc.data()["statusdate"],
          REFNO: e.payload.doc.data()["refno"],
          STATE: e.payload.doc.data()["state"]
        }
      })
        this.ApproveListArray.push(this.approves);
    })
  }

  trackByDate(value: bapproveList): string {
    return value.STARTDATE;
  }

  navigateToApprDetails(item){
    this.router.navigate([`/approval/details/${this.idtype}/${this.status}/${item}/`]);
  }


}
