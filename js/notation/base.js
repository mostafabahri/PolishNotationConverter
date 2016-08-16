/***
NOTE:
  I am aware there are much duplicate code in other js code here.
  I'm saving them for the sake of having individual function for
  each conversion between notations (as a reference if you will).
  6 functions total.
***/


function reverse_arr(s) {
    for (var i = s.length - 1, r = []; i >= 0; r.push(s[i--])) {}
    return r;
}

function isOperand(ch) {
    // number or alphabet char
    return ch.match("((?:[a-zA-Z])|(?:[0-9]+))");
}

function isOperator(ch) {
  //supported opeartors are: ( + - * / ^)
    return "+-*/^".indexOf(ch) != -1;
}

function replaceAt(str,index, char) {
    return str.substr(0, index) + char + str.substr(index + char.length);
}

function swapPranthesis(arr) {
    var swapped = arr;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == '(') {
            swapped = replaceAt(swapped,i, ')');
        } else if (arr[i] == ')') {
            swapped = replaceAt(swapped,i, '(');
        }
    }
    return swapped;
}
