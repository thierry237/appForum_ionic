import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCommentPageRoutingModule } from './edit-comment-routing.module';

import { EditCommentPage } from './edit-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCommentPageRoutingModule
  ],
  declarations: [EditCommentPage]
})
export class EditCommentPageModule {}
