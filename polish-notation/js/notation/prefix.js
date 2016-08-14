//all tests passed
function validPrefix(exp) {
    // console.log("prefix validity");
    exp = reverse_arr(exp.split(""));
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

function prefixToInfix(exp) {
    rev_exp = reverse_arr(exp.split(""));
    stack = [];
    for (var i = 0; i < rev_exp.length; i++) {
        var c = rev_exp[i];
        if (isOperand(c)) {
            stack.push(c);
        } else if (isOperator(c)) {
            lhs = stack.pop();
            rhs = stack.pop();
            stack.push('(' + lhs + c + rhs + ')');
        }
    }
    return stack[stack.length - 1]; //stack top
}

function prefixToPostfix(exp) {
    rev_exp = reverse_arr(exp.split(""));
    stack = [];
    for (var i = 0; i < rev_exp.length; i++) {
        var c = rev_exp[i];
        if (isOperand(c)) {
            stack.push(c);
        } else if (isOperator(c)){
            lhs = stack.pop();
            rhs = stack.pop();
            stack.push(lhs + rhs + c);
        }
    }
    return stack[stack.length - 1]; //stack top
}
