// ###################################################################################
// ## START IMPORT
// ## Library
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ## END IMPORT
// ###################################################################################

const urlApp = '/';
const port = 20038;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
	session({
		secret: '001/011100110110010101100011011100100110010101110100',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
	console.log('<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	console.log('#  Web Messenger light v1.0.0');
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
app.get('/', async (req, res) => {
	var data = fs.readFileSync(__dirname + '/www/html/pages/index.html', {
		encoding: 'utf8',
	});

	res.setHeader('Content-Type', 'text/html');
	res.writeHead(200);
	res.end(data);
});
// ## END GET REQUEST
// ###################################################################################

export default app;
