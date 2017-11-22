import { NgModule } from '@angular/core';
import { StringFormatPipe } from './string-format.pipe';

@NgModule({
    declarations: [
        StringFormatPipe
    ],
    exports: [StringFormatPipe],
})
export class StringFormatModule { }
