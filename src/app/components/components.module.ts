import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SharedPipesModule } from 'src/app/pipe/shared-pipes.module';
import { MessageWithSvgComponent } from './message-with-svg/message-with-svg.component';


@NgModule({
  declarations: [
    MessageWithSvgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    SharedPipesModule
  ],
  exports: [
    MessageWithSvgComponent,
  ],
})
export class ComponentsModule { }
