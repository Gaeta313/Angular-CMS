import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleArticleRoutingModule } from './single-article-routing.module';
import { SingleArticleComponent } from './single-article.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SingleArticleComponent
  ],
  imports: [
    CommonModule,
    SingleArticleRoutingModule,
    SharedModule
  ]
})
export class SingleArticleModule { }
