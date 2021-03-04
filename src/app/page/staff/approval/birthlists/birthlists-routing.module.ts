import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthlistsPage } from './birthlists.page';

const routes: Routes = [
  {
    path: 'birth/:id/:id2',
    component: BirthlistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthlistsPageRoutingModule {}
