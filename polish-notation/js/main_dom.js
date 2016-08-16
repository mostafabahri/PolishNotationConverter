// 'use strict'
// $(".fa-spin").hide();

$.fn.readwritify = function() { //used to rest to normal state
    this
        .prop('readonly', false)
        // .val('');
    return this; //allow plugin chaining
};
$.fn.readonlify = function() { //when one input is focused, othes must be off!
    this
        .prop('readonly', true)
        .val("computing...");
    return this;
};
$.fn.remove_has_classes = function() {
    this.parent()
        .removeClass('has-error')
        .removeClass('has-success');
    return this;
};
$.fn.add_error = function() {
    this.parent().addClass('has-error');
    return this;
};
$.fn.add_success = function() {
    this.parent().addClass('has-success');
    return this;
};

var notes = $(":input[type='text']");
var _pre = notes[0],
    _in = notes[1],
    _post = notes[2];

_pre.name = "pre";
_in.name = "in";
_post.name = "post";

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

function activate_tooltip(arg) {
    $(arg).tooltip({
        placement: 'bottom',
        title: "Invalid " + arg.name + "fix expression!",
        container:"body"
    });
}

$(".example").hide();
////////////this one///////////
function event_handler(main, other_nots, other_functions, validity_func) {
    $(main).on('input', function(event) { //on inputing every char
            $(".fa-spin").show(200);
            if (validity_func(this.value)) {
              $(this).tooltip('destroy');
                for (var i = 0; i < 2; i++)
                    other_nots[i].value = other_functions[i](this.value);
            }
        })
        .keyup(function() { //on text remove(backspace,del)
            if (!this.value) { //if this empty , set to default
                $(other_nots).val('');
                $(this).remove_has_classes();
                $(other_nots).remove_has_classes();
            }
        })
        .focusin(function() {
          if (this === _pre) {
              $(".example").eq(0).show('fast');
          } else if (this === _in) {
              $(".example").eq(1).show('fast');
          } else {
              $(".example").eq(2).show('fast');
          }
          if(!this.value){
            $(other_nots).readonlify();
            $(other_nots).remove_has_classes();}
        })
        .focusout(function() {

            if (this.value) { // foucout and non empty
                $(other_nots).readwritify();
                if (!validity_func(this.value)) { //invalid input, turn red!
                    $(this).remove_has_classes().add_error();
                    activate_tooltip(this);
                    $(other_nots).val('');
                } else {
                    $(this).remove_has_classes().add_success();
                }
            } else {
                $(other_nots).val('');
                $(this).tooltip('destroy');
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
