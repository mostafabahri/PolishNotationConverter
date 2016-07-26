/*
Core conversation in notations
Pre> In
Post>In
*/

function reverse_string(s) {
    for (var i = s.length - 1, r = ''; i >= 0; r += s[i--]) {}
    return r;
}
/**
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
    return stack.length == 1 ? stack[0] : -1;
}
/**
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
    return stack.length == 1 ? stack[0] : -1;
}
//TEST CASES:
// prefixToInfix("+/356")
// prefixToInfix("*+A-bc/-d3+-fgh")

// postfixToInfix("12+3/")
// postfixToInfix("512+4*+3-")
