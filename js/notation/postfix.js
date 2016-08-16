function validPostfix(exp) {
    exp = exp.split("");
    var watch; // holds number of operands
    watch = 0;
    for (var i = 0; i < exp.length; i++) {
        if (isOperand(exp[i])) {
            ++watch;
        } else if(isOperator(exp[i])) {
           //binary operator and less than 2 operands ?
            if (watch < 2) return false;
            --watch;
        }
    }
    return watch === 1;
}

function postfixToInfix(exp) {
    exp = exp.split("");
    stack = [];
    for (var i = 0; i < exp.length; i++) {
        var c = exp[i];
        if (isOperand(c)) {
            stack.push(c);
        } else if (isOperator(c)) {
          rhs = stack.pop();
          lhs = stack.pop();
          stack.push('(' + lhs + c + rhs + ')');
        }
    }
    return stack[stack.length - 1]; //stack top
}

function postfixToPrefix(exp) {
    exp = exp.split("");
    stack = [];
    for (var i = 0; i < exp.length; i++) {
        var c = exp[i];
        if (isOperand(c)) {
            stack.push(c);
        } else if (isOperator(c)) {
          lhs = stack.pop();
          rhs = stack.pop();
          stack.push(c + rhs + lhs);
        }
    }
    return stack[stack.length - 1]; //stack top
}
