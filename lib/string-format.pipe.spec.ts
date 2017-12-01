import 'zone.js';
import 'reflect-metadata';
import { StringFormatPipe } from './string-format.pipe';
import { expect } from 'chai';

describe('StringFormatPipe strings', () => {
    
  it('width', () => {
    const pipe = new StringFormatPipe();
    expect(pipe.transform('%10s', 'chuck')).to.equal('     chuck');
    expect(pipe.transform('%2s', 'chuck')).to.equal('chuck');
  });

  it('index', () => {
    const pipe = new StringFormatPipe();
    expect(pipe.transform('%2$s %1$s', 'norris', 'chuck')).to.equal('chuck norris');
  });


});

describe('StringFormatPipe numbers', () => {  
  
  it('standard', () => {
    const pipe = new StringFormatPipe();
    expect(pipe.transform('%d', 24)).to.equal('24.00');
    expect(pipe.transform('%d', '24')).to.equal('24.00');
  });

  it('precision', () => {
    const pipe = new StringFormatPipe();
    expect(pipe.transform('%.0d', 24)).to.equal('24');
    expect(pipe.transform('%.2d', 24)).to.equal('24.00');
  });
  
});
