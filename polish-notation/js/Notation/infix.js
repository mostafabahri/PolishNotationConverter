function validInfix(exp) {
  return false;
}


function infixToPrefix(exp) {
    exp = swapPranthesis(exp);
    exp = reverse_arr(exp.split(""));
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
        if (isOperand(c)) {
            result.push(c);
        } else if (c == '(') {
            opStack.push(c);
        } else if (c == ')') {
            topTok = opStack.pop();
            while (topTok != '(') {
                topTok = opStack.pop();
            }
        } else{
            while (opStack.length !== 0 && prec[opStack[opStack.length-1]] >= prec[c]) {
                result.push(opStack.pop());
            }
            opStack.push(c);
        }
    }
    while (opStack.length !== 0) {
        result.push(opStack.pop());
    }
    return reverse_arr(result.join("")).join("");
}




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
  if (isOperand(c)) {
            result.push(c);
        } else if (c == '(') {
            opStack.push(c);
        } else if (c == ')') {
            topTok = opStack.pop();
            while (topTok != '(') {
                result.push(topTok);
                topTok = opStack.pop();
            }
        } else {
            while (opStack.length !== 0 && prec[opStack[opStack.length-1]] >= prec[c]) {
                result.push(opStack.pop());
            }
            opStack.push(c);
        }
    }
    while (opStack.length !== 0) {
        result.push(opStack.pop());
    }
    return result.join("");
}
