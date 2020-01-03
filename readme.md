# MV.TO.JS

Use this little code snippet in your subroutines or functions to convert a given dynamic array to a correctly formatted JavaScript array.

This code **only formats** the dynamic array to JavaScript.  To Ensure your array data is valid in JavaScript, your own code must consider escaping string values such as quotations marks, slashes, backslashes, etc.

This code has only been tested with D3, but should be generic enough to work on most any MV platform

## Option: FORCE.THREE.DIMENSIONS
When the option flag ```FORCE.THREE.DIMENSIONS``` is set to ```1=true```, the JavaScript array will be created as a 3 dimensional array i.e. ```array[][][]```.  This allows for consistency with the MV dynamic array model i.e. ```rec<a,v,s>```. Making the array consistent can make it easier to write JavaScript functions that iterate over, extract, or update array data in a manner with which MV developers are accustomed.

### Example: JavaScript mvExtract function
```
mvExtract = function(jsArray, a, v, s) { 
    a -= 1;
    v -= 1;
    s -= 1;
    if (a < 0) {a = 0;}
    if (v < 0) {v = 0;}
    if (s < 0) {s = 0;}
    return jsArray[a][v][s];
}
```
This simple JavaScript function emulates the MV BASIC approach to extracting data from a dynamic array.  The JavaScript array created by MV.TO.JS could be passed to this function and have values extracted by supplying the attribute, value, and subvalue indexes.