// ###################################################################################
// ## START IMPORT
// ## Library
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';

// ## START SOCKET.IO

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ## END IMPORT
// ###################################################################################

const urlApp = '/';
const port = 20038;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return compression.filter(req, res);
};

app.use(
	session({
		secret: '001/011100110110010101100011011100100110010101110100',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(
	compression({
		// Compress all HTTP responses
		filter: shouldCompress,
		threshold: 0,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
	console.log('<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	console.log('#  Web Messenger light v1.0.1');
	console.log(`#  URL Web listening at http://localhost:${port}${urlApp}`);
	console.log('');
	console.log('#  Developed by    : 🐻｜LeGrizzly#0341');
	console.log(' _                _____          _               _');
	console.log('| |              / ____|        (_)             | |');
	console.log('| |        ___  | |  __   _ __   _   ____  ____ | |  _   _');
	console.log('| |       / _ \\ | | |_ | | \\__| | | |_  / |_  / | | | | | |');
	console.log('| |____  |  __/ | |__| | | |    | |  / /   / /  | | | |_| |');
	console.log('|______|  \\___|  \\_____| |_|    |_| /___| /___| |_|  \\__, |');
	console.log('                                                      __/ |');
	console.log('                                                     |___/');
	console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~_Update: 18/05/2022_~~-->');
});

// ###################################################################################
// ## START GET REQUEST
app.get('/auth', async (req, res) => {
	if (req.session.loggedin) res.redirect('/');

	var data = fs.readFileSync(__dirname + '/www/html/pages/login.html', {
		encoding: 'utf8',
	});

	res.setHeader('Content-Type', 'text/html');
	res.writeHead(200);
	res.end(data);
});

app.get('/', async (req, res) => {
	if (req.session.loggedin) {
		var data = fs.readFileSync(__dirname + '/www/html/pages/index.html', {
			encoding: 'utf8',
		});

		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);
		res.end(data);
	} else {
		res.redirect('/auth');
	}
});

app.get('/logout', async (req, res) => {
	if (req.session.loggedin) {
		req.session.destroy(function () {
			res.redirect('/auth');
		});
	} else {
		res.redirect('/');
	}
});

app.get('/changelog', async (req, res) => {
	var data = fs.readFileSync(__dirname + '/www/html/pages/changelog.html', {
		encoding: 'utf8',
	});

	res.setHeader('Content-Type', 'text/html');
	res.writeHead(200);
	res.end(data);
});

app.get('/assets/css/style.login.css', async (req, res) => {
	var data = fs.readFileSync(
		__dirname + '/www/html/assets/css/style.login.css'
	);

	res.setHeader('Content-Type', 'text/css');
	res.writeHead(200);
	res.end(data);
});
// ## END GET REQUEST
// ###################################################################################

// ###################################################################################
// ## START POST REQUEST
app.post('/auth', async (req, res) => {
	var floatingName = String(req.body.floatingName).toLowerCase();

	if (floatingName) {
		req.session.loggedin = true;
		req.session.name = floatingName;
		req.session.timeout = 0;

		io.on('connection', (socket) => {
			console.log(req.session.name, 'Connected');

			socket.on('chat message', (msg) => {
				socket.broadcast.emit('chat message', msg);
			});

			socket.on('disconnect', () => {
				console.log(req.session.name, 'Disconnected');
			});
		});

		// return request POST
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);
		res.end('true');
	} else {
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(203);
		res.end('Connexion user in progress!');
	}
});
// ## END POST REQUEST
// ###################################################################################

export default app;
