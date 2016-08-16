var examples = [
    ['+ab', '/+345', '^A*35'],
    ['a+b', '(3+4)/5', 'A^3*5'],
    ['ab+', '34+5/', 'A35*^']
];
for (var i = 0; i < examples.length; i++) {
    var row = '<strong>Example: </strong>';
    for (var j = 0; j < examples[i].length; j++) {
        row += '<code> ' + examples[i][j] + ' </code>';
    }
    $(".example").eq(i).append(row); //is this secure?
}
