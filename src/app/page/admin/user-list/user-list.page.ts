import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import Fuse from 'fuse.js';
import { citizensList } from 'src/app/models/citizen';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users: any;

  term = '';

  //role
  role : string;

  CitizensListArray: citizensList[] = [];

  options: Fuse.IFuseOptions<citizensList> = {
    keys: [
      { name: 'NAME', weight: 0.4 },
      { name: 'RACE', weight: 0.2 },
      { name: 'RELIGION', weight: 0.2 },
      { name: 'GENDER', weight: 0.1 },
      { name: 'IC', weight: 0.1 },
      { name: 'BIRTHCERNO', weight: 0.1 }
    ]
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.adminService.read_citizen().subscribe(data => {

      this.users = data.map(e => {
        return {
          IC: e.payload.doc.id,
          NAME: e.payload.doc.data()['name'].toUpperCase(),
          RELIGION: e.payload.doc.data()['religion'],
          RACE: e.payload.doc.data()["race"],
          GENDER: e.payload.doc.data()["gender"],
          BIRTHCERNO: e.payload.doc.data()['birthcertificate'],
          IMAGE: e.payload.doc.data()["picture"]
        };
      })
      this.CitizensListArray.push(this.users);
    });
     

  }

  trackByName(value: citizensList): string {
    return value.NAME;
  }
    
  navigateToUserDetails(staffID) {
    this.router.navigate([`/citizen/${staffID}`]);
  }

}
