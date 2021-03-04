import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {

  apprbutton = [];
  status = [];
  click = false;
  type: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.apprbutton = [];
   
   this.apprbutton.push("Register Identification Card", "Renew Identification Card", "Edit Identification Card", "Register Birth Certificate", "Register Marriage");

   this.status = [];
   
   this.status.push("complete", "fail", "approve", "progress");
  }
  save(item){
   if(item == "Register Identification Card"){
    this.type = "ic-register";
  }else if(item == "Renew Identification Card"){
    this.type = "ic-renew";
  }else if(item == "Edit Identification Card"){
    this.type = "ic-edit";
  }else if(item == "Register Birth Certificate"){
    this.type = "birth-register";
  }else if(item == "Register Marriage"){
    this.type = "marry-register";
  }
  this.click = true;
}

  openpage(item){
    if(this.type == "birth-register"){
      if(item == "complete"){
        this.router.navigate([`/approval/birth/${this.type}/${item}`]);
      }else if(item == "fail"){
        this.router.navigate([`/approval/birth/${this.type}/${item}`]);
      }else if(item == "approve"){
        this.router.navigate([`/approval/birth/${this.type}/${item}`]);
      }else if(item == "progress"){
        this.router.navigate([`/approval/birth/${this.type}/${item}`]);
      }
    }else if(this.type == "marry-register"){
      if(item == "complete"){
        this.router.navigate([`/approval/marry/${this.type}/${item}`]);
      }else if(item == "fail"){
        this.router.navigate([`/approval/marry/${this.type}/${item}`]);
      }else if(item == "approve"){
        this.router.navigate([`/approval/marry/${this.type}/${item}`]);
      }else if(item == "progress"){
        this.router.navigate([`/approval/marry/${this.type}/${item}`]);
      }
    }
    else{
      if(item == "complete"){
        this.router.navigate([`/approval/${this.type}/${item}`]);
      }else if(item == "fail"){
        this.router.navigate([`/approval/${this.type}/${item}`]);
      }else if(item == "approve"){
        this.router.navigate([`/approval/${this.type}/${item}`]);
      }else if(item == "progress"){
        this.router.navigate([`/approval/${this.type}/${item}`]);
      }
    }
    
  }

 
}
