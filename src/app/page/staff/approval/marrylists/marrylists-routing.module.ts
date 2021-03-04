import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarrylistsPage } from './marrylists.page';

const routes: Routes = [
  {
    path:'marry/:id/:id2',
    component: MarrylistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarrylistsPageRoutingModule {}
