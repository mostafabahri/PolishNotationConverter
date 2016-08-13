// 'use strict'

$.fn.readwritify = function() { //used to rest to normal state
    this
        .prop('readonly', false)
        // .attr('value', null);
};
$.fn.readonlify = function() { //when one input is focused, othes must be off!
    this
        .prop('readonly', true)
        // .attr('value', "computing...");
        console.log("in readonlify", this);
};
$.fn.remove_has_classes = function() {
    this.parent()
        .removeClass('has-error')
        .removeClass('has-success');
};
$.fn.add_error = function() {
    this.parent().addClass('has-error');
};
$.fn.add_success = function() {
    this.parent().addClass('has-error');
};

var notes = $(":input[type='text']");
var _pre = notes[0],
    _in = notes[1],
    _post = notes[2];

var other_nots = {
    _pre: [_in, _post],
    _in: [_pre, _post],
    _post: [_pre, _in]
};
var other_functions = {
    _pre: [prefixToInfix, prefixToPostfix],
    _in: [infixToPrefix, infixToPostfix],
    _post: [postfixToPrefix, postfixToInfix]
};
var validity_func = {
    _pre: validPrefix,
    _in: validInfix,
    _post: validPostfix
};
////////////this one///////////

function event_handler(main, other_nots, other_functions, validity_func) {
    $(main).on('input', function(event) { //on inputing every char
            if (validity_func(this.value)) {
                for (var i = 0; i < 2; i++)
                    other_nots[i].value = other_functions[i](this.value);
            }
        })
        .keyup(function() { //on text remove(backspace,del)
            if (!this.value) { //if this empty , set to default
                $(other_nots).val('');
                $(this).remove_has_classes();
            }
        })
        .focusin(function() {
            $(other_nots).readonlify();
            $(other_nots).remove_has_classes();
        })
        .focusout(function() {
            console.log("out: ", this.value);
            if (this.value) { // foucout and non empty
                $(other_nots).readwritify();
                if (!validity_func(this.value)) { //invalid input, turn red!
                    $(this).remove_has_classes().add_error();
                    // if (main === _pre) {
                    //     console.log("its _pre");
                    //     $("#preAlert").slideDown("slow");
                    // }
                    $(other_nots).val('');
                } else {
                    $(this).remove_has_classes().add_success();
                }
            } else {
                $(other_nots).val('');
                $(this).remove_has_classes();
                $(other_nots).readwritify();
            }
        })
        .focus(function() { // for convenience
            $(this).select();
        });
}


event_handler(_in, other_nots._in, other_functions._in, validity_func._in);
event_handler(_pre, other_nots._pre, other_functions._pre, validity_func._pre);
event_handler(_post, other_nots._post, other_functions._post, validity_func._post);
