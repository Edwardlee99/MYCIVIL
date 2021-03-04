import { Component,OnInit } from '@angular/core';
import { TabItem } from './tab-item.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit {
  selectedTab: string;
  tabs: TabItem[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    this.selectedTab = this.router.url.split('/').pop();
    if (this.selectedTab === 'tabs') { // TODO do this on routing level instead
      this.router.navigate(['tabs', 'dashboard'], { replaceUrl: true });
    }
    
      this.tabs = [
        {
          name: 'Profile',
          path: 'profile',
          icon: 'person-circle-outline'
        },
        {
          name: 'Dashboard',
          path: 'dashboard',
          icon: 'reader-outline'
        },
        {
          name: 'More',
          path: 'more',
          icon: 'ellipsis-vertical-outline'
         
        }
      ];
      
  }

}
