# ngx-stringformat  
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE.md)

> Useful pipe for [Angular](https://angular.io/) inspired by the [java.util.lang.format()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#format(java.lang.String,%20java.lang.Object...)) method

Try the StringFormat pipe online using [this website](https://string.surge.sh)

## Table of contents

 - [Installation](#installation)
 - [String](#use-stringformat-for-string-formatting)
 - [Number](#use-stringformat-pipe-for-number-formatting)
 - [Error management](#error-management)

## Installation

### Use npm to install the package

  ```terminal
  $ npm install ngx-stringformat --save 
  ```

### Add into your module `imports` the `NgStringFormatModule` in order to add the pipe.

  ```typescript
  import {NgStringFormatModule} from 'ngx-stringformat';
  
  @NgModule({
   // ...
   imports: [
     // ...
     NgStringFormatModule
   ]
  })
  ```

### Pipes are also injectable and can be used in Components / Services / etc..

  ```typescript  
  import { StringFormatPipe } from 'ngx-stringformat';

  @Component()
  export class AppComponent {
    constructor(private stringFormat: StringFormatPipe) {}
    // ..
  }
  ```
  
### Pipes can be created manually to change the locale

  ```typescript  
  import { StringFormatPipe } from 'ngx-stringformat';

  @Component()
  export class AppComponent {
    evaluate() {
      console.log(new StringFormatPipe('fr-FR').transform('%d', 24));
    }
    // ..
  }
  ```

## How to use use stringFormat pipe for string formatting

### Typescript

  ```typescript  
  this.stringFormat.transform('My name is %s' | 'Sam' );
  // Returns: "My name is sam"
  
  this.stringFormat.transform('Hi %2$s %1$s' | 'Norris' : 'Chuck');
  // Returns: "Hi Chuck Norris"
  
  this.stringFormat.transform('Dear %10s %10s' | 'Chuck' : 'Norris');
  // Returns: "Dear           Chuck          Norris"
  ```

### Html

  ```html  
  {{ 'My name is %s' | stringFormat : 'Sam' }}
  <!-- Display: "My name is sam" -->

  {{ 'Hi %2$s %1$s' | stringFormat : 'Norris' : 'Chuck' }}
  <!-- Display: "Hi Chuck Norris" -->

  {{ 'Dear %10s %10s' | stringFormat : 'Chuck' : 'Norris' }}
  <!-- Display: "Dear           Chuck          Norris" -->
  ```

## How to use stringFormat pipe for number formatting

### Typescript

  ```typescript  
  this.stringFormat.transform('%d karat of magic in the air' | 24 );
  // Returns: 24.00 karat magic of magic in the air"
  
  this.stringFormat.transform('%d karat of magic in the air' | '24' );
  // Returns: 24.00 karat magic of magic in the air"
  
  this.stringFormat.transform('%2$d+%2$d=%1$d' | 2 : 1);
  // Returns: "1.00+1.00=2.00"
  
  this.stringFormat.transform('I am %.0d years old' | 36);
  // Returns: "I am 36 years old"
  ```

### Html

  ```html  
  {{ '%d karat of magic in the air' | stringFormat : 24 }}
  <!-- Display: "24.00 karat magic of magic in the air" -->

  {{ '%d karat of magic in the air' | stringFormat : '24' }}
  <!-- Display: "24.00 karat magic of magic in the air" -->

  {{ '%2$d+%2$d=%1$d' | stringFormat : 2 : 1 }}
  <!-- Display: "1.00+1.00=2.00" -->

  {{ 'I am %.0d years old' | stringFormat : 36 }}
  <!-- Display: "I am 36 years old" -->

  {{ 'My rate is:%10' | stringFormat : 120 }}
  <!-- Display: "My rate is:       120" -->
  ```

## How to change locale

Locale is managed at the application level.

Please consult the [Setting up the locale of your app] chapter(https://angular.io/guide/i18n#setting-up-the-locale-of-your-app) to change your LOCALE_ID in your @NgModule.

Nevertheless, the local can be set manually using at the component level.
  
  ```typescript  
  import { StringFormatPipe } from 'ngx-stringformat';

  @Component()
  export class AppComponent {
    evaluate() {
      console.log(new StringFormatPipe('fr-FR').transform('%d', 24));
    }
    // ..
  }
  ```
  
## Error messages
  
### Index not found
  
  ```typescript  
  this.stringFormat.transform('Hi %2$s %1$s' | 'Norris' : 'Chuck');
  // Returns: "Hi Chuck [Error! Cannot find value in args for placeholder n°2]"
  ```

### Cannot parse number

  ```typescript  
  this.stringFormat.transform('I am %.0d years old' | 36y );
  // Returns: "I am [Error! Cannot parse value as a number: (36y)] years old"
  ```
