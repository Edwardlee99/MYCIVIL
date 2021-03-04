import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditIcPage } from './edit-ic.page';

const routes: Routes = [
  {
    path: '',
    component: EditIcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditIcPageRoutingModule {}
