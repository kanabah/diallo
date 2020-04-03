import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
     ],
    declarations: [
        SearchBarComponent
    ],
    exports: [
        SearchBarComponent
    ]
})
export class SharedModule {}