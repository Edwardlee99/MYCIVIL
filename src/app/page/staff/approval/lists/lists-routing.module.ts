import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsPage } from './lists.page';

const routes: Routes = [
  {
    path: ':id/:id2',
    component: ListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsPageRoutingModule {}
