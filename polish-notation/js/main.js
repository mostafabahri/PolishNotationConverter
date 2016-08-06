// 'use strict'
function readonlify(arg) {
    return $(arg).prop('readonly', true).attr('value', "computing...");
}

function readwritify(arg) {
    return $(arg).prop('readonly', false).attr('value', null);
}


var notes = $(".container ").find(":input ");
var _pre = notes[0],
    _in = notes[1],
    _post = notes[2];

notes.each(function(index) {
    $(this).focus(function() {
        $(this).select();
    });
});

$(_pre).on('input', function(event) {
    if (this.value) {
        var res = prefixToInfix(this.value);
        if (res != -1 && res.length > 1) {
            _in.value = res;
            _post.value = prefixToPostfix(this.value);
        }
    }
}).focusout(function functionName() {
    if (this.value) {
        readwritify(_in);
        readwritify(_post);
        var res = prefixToInfix(this.value);
        if (res == -1) {
            $(this).parent().addClass('has-error');
            _in.value = _post.value = null;
        } else {
            _in.value = res;
            console.log(prefixToPostfix(this.value));
            _post.value = prefixToPostfix(this.value);
            $(this).parent().removeClass('has-error');
            $(this).parent().addClass('has-success');
        }
    }
}).focusin(function functionName() {
    if (true) {
        console.log("focused in ");
        readonlify(_in);
        readonlify(_post);
    }
}).keyup(function() {
    if (!this.value) {
        _in.value = _post.value = null;
        $(this).parent().removeClass('has-error').removeClass('has-success');
    }
});


$(_in).on('input', function(event) {
    var res = infixtoPostfix(this.value);
    if (res != -1 && res.length > 1) {
        _post.value = res;
        _pre.value = infixToPrefix(this.value);
    }
}).focusout(function functionName() {
    readwritify(_pre);
    readwritify(_post);
    var res = infixtoPostfix(this.value);
    if (res == -1) {
        $(this).parent().addClass('has-error');
    } else {
        _post.value = res;
        _pre.value = infixToPrefix(this.value);
        $(this).parent().removeClass('has-error');
        $(this).parent().addClass('has-success');
    }
}).focusin(function functionName() {
    console.log("focused in ");
    readonlify(_pre);
    readonlify(_post);
}).keyup(function() {
    if (!this.value) {
        _pre.value = _post.value = null;
        $(this).parent().removeClass('has-error').removeClass('has-success');
    }
});

$(_post).on('input', function(event) {
    var res = postfixToInfix(this.value);
    if (res != -1 && res.length > 1) {
        _in.value = res;
        _pre.value = postfixToPrefix(this.value);
    }
}).focusout(function functionName() {
    readwritify(_in);
    readwritify(_pre);
    var res = postfixToInfix(this.value);
    if (res == -1) {
        $(this).parent().addClass('has-error');
    } else {
        _in.value = res;
        // console.log(postfixToPrefix(this.value));
        _pre.value = postfixToPrefix(this.value);
        $(this).parent().removeClass('has-error');
        $(this).parent().addClass('has-success');
    }
}).focusin(function functionName() {
    console.log("focused in ");
    readonlify(_in);
    readonlify(_pre);
}).keyup(function() {
    if (!this.value) {
        _in.value = _pre.value = null;
        $(this).parent().removeClass('has-error').removeClass('has-success');
    }
});
