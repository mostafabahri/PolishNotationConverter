//all tests passed
function validPrefix(exp) {
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
/**
}
  * @param  {string} exp         input string as prefix
  * @return {string} stack top   correspoing infix notation
  */
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

/**
 * @param  {string} exp         input string as prefix
 * @return {string} stack top   correspoing post notation
 */
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



// //target is {in,post}
// function prefixToOther(exp, target) {
//     rev_exp = reverse_arr(exp.split(""));
//     stack = [];
//     for (var i = 0; i < rev_exp.length; i++) {
//         var c = rev_exp[i];
//         if (isOperand(c)) {
//             stack.push(c);
//         } else if (isOperator(c)) {
//             lhs = stack.pop();
//             rhs = stack.pop();
//             if(target){
//             stack.push('(' + lhs + c + rhs + ')');
//           }else{
//             stack.push(lhs + rhs + c);
//           }
//         }
//     }
//     return stack[stack.length - 1]; //stack top
// }
