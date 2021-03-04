import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalPage } from './approval.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalPage
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then( m => m.ListsPageModule)
  },
  {
    path: 'birthlists',
    loadChildren: () => import('./birthlists/birthlists.module').then( m => m.BirthlistsPageModule)
  },
  {
    path: 'marrylists',
    loadChildren: () => import('./marrylists/marrylists.module').then( m => m.MarrylistsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalPageRoutingModule {}
