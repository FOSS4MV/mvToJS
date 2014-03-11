* The MIT License (MIT)
*
* MV.TO.JS Copyright (c) 2014 Kevin Powick
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*
* End of License --------------------------------------------------------------

* Version 1.0.0 - March 2014
*
* MV.TO.JS will convet a given dynamic array to a correctly formatted
* JavaScript array.  This code only formats the dynamic array to JavaScript.
* To Ensure your array data is valid in JavaScript, your own code must consider
* escaping string values such as quotations marks, slashes, backslashes, etc.
*
* The code has only been tested with D3, but should be generic enough to work
* on most any MV platform

FORCE.THREE.DIMENSIONS = 1

* (0/1) Force output of a 3 dimensional JavaScript array. e.g. array[][][]
* This is useful for emulating MV dynamic array data model in JavaScript.
* i.e. REC<ATTR,VALUE,SUBVALUE>. This makes it easier to write JavaScript
* functions that interate over the data in a consistent fasion.

MAX.ATTRIBUTES = DCOUNT(DYN.ARRAY, @AM)
JS.ARRAY = '['
FOR A.POS = 1 TO MAX.ATTRIBUTES
   IF A.POS > 1 THEN JS.ARRAY := ', '
   A.VALUE = DYN.ARRAY<A.POS>
   MAX.VALUES = DCOUNT(A.VALUE, @VM)
   IF MAX.VALUES = 0 THEN MAX.VALUES = 1
   IF MAX.VALUES > 1 THEN JS.ARRAY := '['
   FOR V.POS = 1 TO MAX.VALUES
      V.VALUE = A.VALUE<1,V.POS>
      IF V.POS > 1 THEN JS.ARRAY := ', '
      MAX.SUBVALUES = DCOUNT(V.VALUE, @SVM)
      IF MAX.SUBVALUES = 0 THEN MAX.SUBVALUES = 1
      IF MAX.SUBVALUES > 1 OR FORCE.THREE.DIMENSIONS THEN
         IF MAX.VALUES = 1 THEN JS.ARRAY := '['
         JS.ARRAY := '['
      END
      FOR S.POS = 1 TO MAX.SUBVALUES
         IF S.POS > 1 THEN JS.ARRAY := ', '
         S.VALUE = V.VALUE<1,1,S.POS>
         IF S.VALUE # '' AND NUM(S.VALUE) THEN
            JS.ARRAY := S.VALUE
         END ELSE
            JS.ARRAY := '"':S.VALUE:'"'
         END
      NEXT S.POS
      IF MAX.SUBVALUES > 1 OR FORCE.THREE.DIMENSIONS THEN
         JS.ARRAY := ']'
         IF MAX.VALUES = 1 THEN JS.ARRAY := ']'
      END
   NEXT V.POS
   IF MAX.VALUES > 1 THEN JS.ARRAY := ']'
NEXT A.POS
JS.ARRAY := ']'