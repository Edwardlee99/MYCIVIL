import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IcregisterPage } from './icregister.page';

const routes: Routes = [
  {
    path: '',
    component: IcregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IcregisterPageRoutingModule {}
