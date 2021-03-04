import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewIcPage } from './renew-ic.page';

const routes: Routes = [
  {
    path: '',
    component: RenewIcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewIcPageRoutingModule {}
