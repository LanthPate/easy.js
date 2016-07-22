# easy.js
A small, versatile JavaScript library.

## Documentation
```JavaScript
// easy or $ can both be used to represent the library
// you can also create a global variable to hold the value of this library
// for example:
var lib = easy; // or var lib = $;

// in case you are using jQuery or other JavaScript libraries/framework that use $ as an alias
// OR
// you are using another variable called 'easy' but it is not the library
// like var easy = 0
// you can use easy.noConflict like this
if(easy && easy.noConflict) {
  easy.noConflict()
}

// if you want to do something as soon as document is ready (DOMContentLoaded)
// you could use $.ready
$.ready(function(){
  // ...
});

// easy.repeat = for loop
// normally, you would use:
  for(var i=0;i<someOtherVariable;i++) {
    // ...  
  }
  
// with easyJS, you do:
  $.repeat(function(i){
    // ...
  },someOtherVariable);
  
// easy.get = document.querySelectorAll + more
// getting all 'p' element
  $.get('p')
  
// getting all 'class' as class element
  $.get('.class')

// getting element with id
  $.get('#id')
  
// getting elements with attribute
  $.get('div[class=div]')
  
/*
  NOTE: $.get will return an array-like object if there are more than one elements that match the selector,
        which means $.get('p').doSomeThing() would not work.
*/
// You must specify an index:
  $.get('p')[index]
  
// If you need to call a function on every item in the array-like object, you can use:
  $().each(fn,true)
```
```
// (this===documentation && documentation.toBeContinued)
```
