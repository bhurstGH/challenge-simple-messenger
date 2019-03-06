const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//View configuration
app.set('views', "views")
app.set('view engine', 'ejs');

//Public static files
app.use(express.static('public'));

//Serve the index.ejs
app.get('/', (req, res) => {
    res.render("index");
})

//Listen for socket.io connections
io.on('connection', (socket) => {
    
    //Handle usernames
    socket.username = "Guest" + Math.floor(Math.random() * (999 - 100));
    socket.on('change_username', (data) => {
        socket.username = data.username;
    })

    //Announce the user to console
    console.log(socket.username + ' connected');

    //Emit the chat message event
    socket.on('chat message', (msg) => {
        io.emit('chat message', socket.username + ": " + msg);
    })

    socket.on('disconnect', () => {
        console.log(socket.username + ' disconnected');
    })
}
)
//Start server on port 8000
http.listen(8000, () => {
    console.log('server listening on port 8000');
})