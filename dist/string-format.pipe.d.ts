import { PipeTransform } from '@angular/core';
export declare class StringFormatPipe implements PipeTransform {
    private _localeId;
    localeId: string;
    constructor(_localeId: string);
    transform(value: any, ...args: any[]): any;
    getReplacements(slices: string[], args: any): string[];
    formatDecimal(slice: string, index: number, args: any[]): string;
    formatString(slice: string, index: number, args: any[]): string;
    getWidth(format: string): number;
    getPrecision(format: string): number;
    getIndex(format: string): number;
    getType(format: string): string;
    getSlices(value: any): Array<string>;
}
