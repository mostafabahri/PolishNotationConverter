function validInfix(exp) {
    //paren check
    var paren = 0; //left paren ++ ,right paren --
    for (var i = 0; i < exp.length; i++) {
        if (paren < 0) return false; //unmatching parens
        if (exp[i] === '(') {
            ++paren;
        } else if (exp[i] === ')') {
            --paren;
        }
    }
    if (paren) return false; //unmatching parens
    var oprtr = 0,
        oprnd = 0;
    for (var j = 0; j < exp.length; j++) {
        if (isOperator(exp[j])) {
            oprtr++;
        } else if (isOperand(exp[j])) {
            oprnd++;
        }
    }
    //unmatching number of operators and operands
    if(oprnd - oprtr!==1) return false;
    //not okay yet :(
    return true;
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
        } else if (c === '(') {
            opStack.push(c);
        } else if (c === ')') {
            topTok = opStack.pop();
            while (topTok != '(') {
                result.push(topTok);
                topTok = opStack.pop();
            }
        } else {
            while (opStack.length !== 0 && prec[opStack[opStack.length - 1]] >= prec[c]) {
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

function infixToPostfix(exp) {
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
        } else if (c === '(') {
            opStack.push(c);
        } else if (c === ')') {
            topTok = opStack.pop();
            while (topTok !== '(') {
                result.push(topTok);
                topTok = opStack.pop();
            }
        } else {
            while (opStack.length !== 0 && prec[opStack[opStack.length - 1]] >= prec[c]) {
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
