import { Pipe, PipeTransform, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';

const REG_INDEX = /[0-9]+\$/;
const REG_WIDTH = /[0-9]+/;
const REG_PRECISION = /\.[0-9]+/;
const REG_TYPE = /d|s/;
const REG = /%([0-9]+\$)?([0-9]*)?(\.[0-9]+)?(d|s)/g;

@Pipe({
  name: 'stringFormat'
})
export class StringFormatPipe implements PipeTransform {

  transform(value: any, ...args): any {
    let slices: Array<string> = this.getSlices(value);
    let replacements: Array<string> = this.getReplacements(slices, args);
    return replacements.join('');
  }

  getReplacements(slices: string[], args): string[] {
    let replacements: Array<string> = new Array<string>();
    let index = 0;
    for (let slice of slices) {
      if (REG.test(slice)) {
        const type = this.getType(slice);
        if (type === 's') {
          replacements.push(this.formatString(slice, index, args));
          index++;
        } else if (type === 'd') {
          replacements.push(this.formatDecimal(slice, index, args));
          index++;
        } else {
          replacements.push(slice)
        }
      } else {
        replacements.push(slice)
      }
    }
    return replacements;
  }

  formatDecimal(slice: string, index: number, args: any[]): string {
    let value: string = "";
    let position = this.getIndex(slice);
    let precision = this.getPrecision(slice);
    let width = this.getWidth(slice);
    let arg = args[position == -1 ? index : position - 1];
    let format: string = (width == -1 ? 1 : width) + '.' + (precision == -1 ? 2 : precision) + '-5';
    try {
      value = new DecimalPipe("en-US").transform(arg, format);
    }
    catch (e) { return '[Error! Cannot parse value as a number: (' + arg + ')]' }
    return value;
  }

  formatString(slice: string, index: number, args: any[]): string {
    let value: string;
    let position = this.getIndex(slice);
    let width = this.getWidth(slice);
    let itemNumber = position == -1 ? index : position - 1
    value = args[itemNumber];
    if (!value || !value.length) {
      return '[Error! Cannot find value in args for placeholder n°' + itemNumber + ']'
    }
    let fix = '';
    if (value.length < width) {
      for (let i = 0; i < width - value.length; i++) {
        fix += ' ';
      }
    }
    return fix + value;
  }

  getWidth(format: string): number {
    let value = '' + format;
    [/%/, REG_INDEX, REG_PRECISION, REG_TYPE].forEach(regex => {
      value = value.replace(regex, '');
    });
    if (REG_WIDTH.test(value)) {
      return +value;
    }
    return -1;
  }

  getPrecision(format: string): number {
    const list: string[] = format.match(REG_PRECISION);
    if (list && list.length > 0) {
      return +list[0].match(/[0-9]+/);
    }
    return -1;
  }

  getIndex(format: string): number {
    const list: string[] = format.match(REG_INDEX);
    if (list && list.length > 0) {
      return +list[0].match(/[0-9]+/);
    }
    return -1;
  }

  getType(format: string): string {
    const type = format.charAt(format.length - 1);
    return type;
  }

  getSlices(value: any): Array<string> {
    let array: Array<string> = new Array();
    let match;
    let lastIndex = 0;
    REG.lastIndex = 0;
    while ((match = REG.exec(value)) !== null) { // Split based on regex
      if (lastIndex < match.index) { // Add previous substring
        array.push(value.substring(lastIndex, match.index));
      }
      lastIndex = match.index + match[0].length;
      array.push(match[0]); // Add current match
    }
    if (lastIndex < value.length - 1) { // Add last substring
      array.push(value.substring(lastIndex, value.lenght));
    }
    return array;
  }

}
