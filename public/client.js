
$(function () {
    var socket = io();
    //Handle the send button on the form.
    $('form').submit(function (e) {
        e.preventDefault(); // Prevent reloading
        socket.emit('chat message', $('#m').val()); //Emit 'chat message' event with form input value
        $('#m').val(''); //Clear form input
        return false; //prevent form submission
    });
    
    //Listen for 'chat message' event
    socket.on('chat message', (msg) => {
        $('#messages').append($('<li>').text(msg)); //insert <li> element with data from event
    })
});