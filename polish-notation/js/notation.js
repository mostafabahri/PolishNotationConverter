/*
Core conversation in notations
Pre> In
Post>In
*/

// Utility!
Array.prototype.top = function() {
    return this[this.length - 1];
};
String.prototype.replaceAt = function(index, char) {
    return this.substr(0, index) + char + this.substr(index + char.length);
};

function reverse_string(s) {
    for (var i = s.length - 1, r = ''; i >= 0; r += s[i--]) {}
    return r;
}
function swapPranthesis(arr) {
    var swapped = arr;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == '(') {
            swapped = swapped.replaceAt(i, ')');
        } else if (arr[i] == ')') {
            swapped = swapped.replaceAt(i, '(');
        }
    }
    return swapped;
}

/**1
 * [prefixToInfix description]
 * @param  {string} exp         input string as prefix
 * @return {string} stack.top() in case of validity, infix expr
 */
function prefixToInfix(exp) {
    exp = exp.split("");
    rev_exp = reverse_string(exp);
    stack = [];
    for (var i = 0; i < rev_exp.length; i++) {
        var c = rev_exp[i];
        if (c.match("((?:[a-zA-Z])|(?:[0-9]+))")) {
            stack.push(c);
        } else if ("+-*/^".indexOf(c) != -1) {
            if (stack.length >= 2) {
                lhs = stack.pop();
                rhs = stack.pop();
                stack.push('(' + lhs + c + rhs + ')');
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }
    return stack.length == 1 ? stack.top() : -1;
}
/**2
 * [postfixToInfix description]
 * @param  {string} exp          input string as postfix
 * @return {string} stack.top() in case of validity, infix expr
 */
function postfixToInfix(exp) {
    exp = exp.split("");
    // rev_exp = reverse_string(exp);
    stack = [];
    for (var i = 0; i < exp.length; i++) {
        var c = exp[i];
        if (c.match("((?:[a-zA-Z])|(?:[0-9]+))")) {
            stack.push(c);
        } else if ("+-*/^".indexOf(c) != -1) {
            if (stack.length >= 2) {
                rhs = stack.pop();
                lhs = stack.pop();
                stack.push('(' + lhs + c + rhs + ')');
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }
    return stack.length == 1 ? stack.top() : -1;
}


/**3
 * [prefixToPostfix description]
 * @param  {[type]} exp [description]
 * @return {[type]}     [description]
 */
function prefixToPostfix(exp) {
    exp = exp.split("");
    rev_exp = reverse_string(exp);
    stack = [];
    for (var i = 0; i < rev_exp.length; i++) {
        var c = rev_exp[i];
        if (c.match("((?:[a-zA-Z])|(?:[0-9]+))")) {
            stack.push(c);
        } else if ("+-*/^".indexOf(c) != -1) {
            if (stack.length >= 2) {
                lhs = stack.pop();
                rhs = stack.pop();
                stack.push(lhs + rhs + c);
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }
    return stack.length == 1 ? stack.top() : -1;
}
/**4
 * [postfixToPrefix description]
 * @param  {[type]} exp [description]
 * @return {[type]}     [description]
 */
function postfixToPrefix(exp) {
    exp = exp.split("");
    // rev_exp = reverse_string(exp);
    stack = [];
    for (var i = 0; i < exp.length; i++) {
        var c = exp[i];
        if (c.match("((?:[a-zA-Z])|(?:[0-9]+))")) {
            stack.push(c);
        } else if ("+-*/^".indexOf(c) != -1) {
            if (stack.length >= 2) {
                lhs = stack.pop();
                rhs = stack.pop();
                stack.push(c + rhs + lhs); //[c,rhs,lhs].join(" ")
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }
    return stack.length == 1 ? stack.top() : -1;
}


function infixToPrefix(exp) {
  exp = swapPranthesis(exp);
  exp = reverse_string(exp).split("");
  prec = {
      '^': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
      '(': 1
  };
  opStack = [];
  result = [];
  result = [];
  for (var i = 0; i < exp.length; i++) {
      var c = exp[i];
      if (c.match("((?:[a-zA-Z])|(?:[0-9]+))")) {
          result.push(c);
      } else if (c == '(') {
          opStack.push(c);
      } else if (c == ')') {
          topTok = opStack.pop();
          while (topTok != '(') {
              topTok = opStack.pop();
          }
      } else if ("+-*/^".indexOf(c) != -1) {
          while (opStack.length !== 0 && prec[opStack.top()] >= prec[c]) {
              result.push(opStack.pop());
          }
          opStack.push(c);
      } else {
          throw "invalid character";
      }
  }
  while (opStack.length !== 0) {
      result.push(opStack.pop());
  }
  return reverse_string(result.join(""));
}
// console.log(infixToPrefix("("));



function infixtoPostfix(exp) {
    exp = exp.split("");
    prec = {
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2,
        '(': 1
    };
    opStack = [];
    result = [];
    for (var i = 0; i < exp.length; i++) {
        var c = exp[i];
        if (c.match("((?:[a-zA-Z])|(?:[0-9]+))")) {
            result.push(c);
        } else if (c == '(') {
            opStack.push(c);
        } else if (c == ')') {
            topTok = opStack.pop();
            while (topTok != '(') {
                result.push(topTok);
                topTok = opStack.pop();
            }
        } else if ("+-*/^".indexOf(c) != -1) {
            while (opStack.length !== 0 && prec[opStack.top()] >= prec[c]) {
                result.push(opStack.pop());
            }
            opStack.push(c);
        } else {
            throw "invalid character";
        }
    }
    while (opStack.length !== 0) {
        result.push(opStack.pop());
    }
    return result.join("");
}

// console.log(infixtoPostfix("3 + 5"));
// console.log(infixtoPostfix("( A + B ) * C - ( D - E ) * ( F + G )"));

//TEST CASES:
// prefixToInfix("+/356")
// prefixToInfix("*+A-bc/-d3+-fgh")

// console.log(postfixToInfix("12+3/"));
// console.log(postfixToInfix("512+4*+3-"));
//
//
// prefixToPostfix("+35")
// postfixToPrefix("135/*")
//
