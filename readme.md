#MV.TO.JSON#

Use this little code snippet in your subroutines or functions to convet a
given dynamic array (DYN.ARRAY) to a correctly formatted JSON array (JSON.ARRAY).

This code only *formats* the dynamic array to JSON.  To Ensure your array is valid
JSON, your own code must consider escaping string values such as quotations marks,
slashes, backslashes, etc.

This code has only been tested with D3, but should be generic enough to work
on most any MV platform