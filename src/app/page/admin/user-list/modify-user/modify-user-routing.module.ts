import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyUserPage } from './modify-user.page';

const routes: Routes = [
  {
    path: ':ic',
    component: ModifyUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyUserPageRoutingModule {}
