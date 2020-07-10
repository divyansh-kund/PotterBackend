const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const image = require('./controllers/image');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'Sanchi123',
		database: 'face'
	}
});

const app = express().use(cors({origin: true}))

app.use(cors())//It solves the problem caused by CORS(Cross-Origin-Resource-Sharing) policy

app.use(bodyParser.urlencoded({extended:false}));//For using POSTMAN

app.use(bodyParser.json());

app.post('/signin',(req,res)=>{signin.SigninHandle(req,res,bcrypt,db)})

app.post('/register',(req,res)=>{register.registerHandle(req,res,bcrypt,db)})

app.listen(process.env.PORT || 3000,()=>{
	console.log("Server's running")
});

app.get('/profile/:id',(req,res)=>{profile.GetProfile(req,res,db)})

app.put('/image',(req,res)=>{image.ImageHandle(req,res,db)})