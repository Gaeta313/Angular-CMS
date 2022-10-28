import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewArticleRoutingModule } from './new-article-routing.module';
import { NewArticleComponent } from './new-article.component';
import { FormsModule } from '@angular/forms';
import { ModalWindowComponent } from 'src/app/components/modal-window/modal-window.component';


@NgModule({
  declarations: [
    NewArticleComponent,
    ModalWindowComponent
  ],
  imports: [
    CommonModule,
    NewArticleRoutingModule,
    FormsModule
  ]
})
export class NewArticleModule { }
