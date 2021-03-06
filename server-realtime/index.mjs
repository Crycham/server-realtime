import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ejs from 'ejs';


const app = express();
const expressServer = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));
app.set('views','./public');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

const io = new Server(expressServer);

io.on('connect', function (socket) {
    console.log('a user is connected');

    setInterval(function () {
        let date = new Date().toLocaleTimeString()
        socket.send(date)
    }, 1000)

    socket.on('disconnect', () => {
        console.log('user disconnected.')
    })

})

app.get('/', (req, res, next) => {
    res.render('index.html');
})
app.get('/time/', (req, res, next) => {
    res.render('index.html');
})

expressServer.listen(8080, () => {
    console.log('server is listening on port 8080...')
})