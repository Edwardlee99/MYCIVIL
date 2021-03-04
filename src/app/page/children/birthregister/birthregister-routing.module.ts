import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthregisterPage } from './birthregister.page';

const routes: Routes = [
  {
    path: '',
    component: BirthregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthregisterPageRoutingModule {}
