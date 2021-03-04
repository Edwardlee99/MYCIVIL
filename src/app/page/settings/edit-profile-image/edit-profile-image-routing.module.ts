import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileImagePage } from './edit-profile-image.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileImagePageRoutingModule {}
