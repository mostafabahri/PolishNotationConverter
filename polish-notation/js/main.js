function deactivate (arg) {
	$('#'+arg).prop('readonly',true).attr('value', "computing...");
}

function activate (arg) {
	$('#'+arg).prop('readonly',false).attr('value', "");
}

// $('#prefixInput').focus(function(event) {
// 	// $('#postfixInput').prop('disabled',true).attr('value', " ");
// 	// $('#infixInput').prop('disabled',true).attr('value', " ");
// 	deactivate('postfixInput');
// 	deactivate('infixInput');

// });


// $('#prefixInput').focusout(function(event) {
// 	activate('postfixInput');
// 	activate('infixInput');
// });



var inputIDs = [];
$("#container").find(":input").each(function() {
	inputIDs.push(this.id);
});
for (var i = 0; i < inputIDs.length; i++) {
		$('#'+inputIDs[i]).focus(function(event) {
			deactivate(inputIDs[i]);
		}).focusout(function(event) {
			activate(inputIDs[i]);
		});
};