import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListPage } from './user-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserListPage
  },
  {
    path: 'modify-user',
    loadChildren: () => import('./modify-user/modify-user.module').then( m => m.ModifyUserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListPageRoutingModule {}
