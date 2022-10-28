import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule
  ],
  exports: [ToolbarComponent]
})
export class SharedModule { }
