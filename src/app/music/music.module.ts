import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MusicRoutingModule } from './music-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MusicRoutingModule
  ]
})
export class MusicModule { }