import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'add-staff',
    loadChildren: () => import('./add-staff/add-staff.module').then( m => m.AddStaffPageModule)
  },
  {
    path: 'staff-list',
    loadChildren: () => import('./staff-list/staff-list.module').then( m => m.StaffListPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
