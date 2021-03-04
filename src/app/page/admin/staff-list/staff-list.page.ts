import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { StaffsList } from 'src/app/models/staffs';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit {

  staffs: any;

  term = '';

  StaffListArray: StaffsList[] = [];

  options: Fuse.IFuseOptions<StaffsList> = {
    keys: [
      { name: 'NAME', weight: 0.2 },
      { name: 'ROLE', weight: 0.1 },
      { name: 'IC', weight: 0.1 },
      { name: 'EMAIL', weight: 0.1 },
      { name: 'ID', weight: 0.1 },
      { name: 'TELNO', weight: 0.1 }
    ]
  };



  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminService.read_staff().subscribe(data => {

      this.staffs = data.map(e => {
        return {
          ID: e.payload.doc.id,
          NAME: e.payload.doc.data()['name'].toUpperCase(),
          EMAIL: e.payload.doc.data()['email'],
          IC: e.payload.doc.data()['ic'],
          TELNO: e.payload.doc.data()["phone"],
          ROLE: e.payload.doc.data()["role"],
          IMAGE: e.payload.doc.data()["picture"]
        };
      })
      this.StaffListArray.push(this.staffs);
    });
    
    
    
  }

 


  navigateToStaffDetails(staffID) {
    this.router.navigate([`/staff/${staffID}`]);
  }
    
}
