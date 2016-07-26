// 'use strict';
// $('#prefixInput').focus(function(event) {
// 	// $('#postfixInput').prop('disabled',true).attr('value', " ");
// 	// $('#infixInput').prop('disabled',true).attr('value', " ");
// 	deactivate('infixInput');
// 	deactivate('postfixInput');

// });


// $('#prefixInput').focusout(function(event) {
// 	activate('postfixInput');
// 	activate('infixInput');
// });

// console.log(inputIDs.join(","))
// for (var i = 0; i < inputIDs.length; i++) {
// 		$('#'+inputIDs[i]).focus(function(event) {
// 			deactivate(inputIDs[i]);
// 		}).focusout(function(event) {
// 			activate(inputIDs[i])
// 		});
// }
function readonlify(arg) {
    $(arg).prop('readonly', true).attr('value', "computing...");
}

function readwritify(arg) {
    $(arg).prop('readonly', false).attr('value', "");
}

var inputIDs = [];
$(".container").find(":input").each(function() {
    inputIDs.push(this.id);
});
var res = prefixToInfix("*/345");
console.log(res);

var notes = $(".container ").find(":input ");
var _pre = notes[0],
    _in = notes[1],
    _post = notes[2];

$(notes[0]).on('input', function(event) {
    var res = prefixToInfix(notes[0].value);
    if (res != -1) {
        notes[1].value = res;
    }
}).focusout(function functionName() {
    readwritify(notes[1]);
    readwritify(notes[2]);
    var res = prefixToInfix(notes[0].value);
    if (res == -1) {
        $(this).parent().addClass('has-error');
    } else {
        notes[1].value = res;
        $(this).parent().removeClass('has-error');
        $(this).parent().addClass('has-success');
    }
}).focusin(function functionName() {
    console.log("focused in ");
    // notes[1].value=notes[2].value="";
    readonlify(notes[1]);
    readonlify(notes[2]);
});



//postfix
$(notes[2]).on('input', function(event) {
    var res = postfixToInfix(notes[2].value);
    if (res != -1) {
        notes[1].value = res;
    }
}).focusout(function functionName() {
    readwritify(notes[0]);
    readwritify(notes[1]);
    var res = postfixToInfix(notes[2].value);
    if (res == -1) {
        $(this).parent().addClass('has-error');
    } else {
        notes[1].value = res;
        $(this).parent().removeClass('has-error');
        $(this).parent().addClass('has-success');
    }
}).focusin(function functionName() {
    console.log("focused in ");
    // notes[1].value=notes[2].value="";
    readonlify(notes[0]);
    readonlify(notes[1]);
});
