const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/login');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
	client : 'pg',
	connection : {
		host : 'localhost',
		user : 'postgres',
		password : '123456789',
		database : 'smart-brain'

	}
});


const app = express();


app.use(bodyParser.json());
app.use(cors());


app.post('/signin',  signin.handleSignin(db, bcrypt) );

app.post('/register', register.handleRegister(db, bcrypt) );

app.get('/profile/:id', profile.handleProfile(db) );

app.put('/image', image.handleImage(db) );


app.listen(3000, () => {
	console.log('App is running on port 3000');
});



/*
	/ --> res = this is working
	/sigin --> POST = success/fail
	/register --> POST = newUser 
	/profile/:userId --> GET = user home
	/image --> PUT --> new image detection

*/