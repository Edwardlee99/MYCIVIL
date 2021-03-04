import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffListPage } from './staff-list.page';

const routes: Routes = [
  {
    path: '',
    component: StaffListPage
  },
  {
    path: 'modify-staff',
    loadChildren: () => import('../staff-list/modify-staff/modify-staff.module').then( m => m.ModifyStaffPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffListPageRoutingModule {}
