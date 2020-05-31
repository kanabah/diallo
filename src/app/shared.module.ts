import { NavAdmiComponent } from './admi/nav-admi/nav-admi.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
     ],
    declarations: [
        SearchBarComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SearchBarComponent,
    ]
})
export class SharedModule {}