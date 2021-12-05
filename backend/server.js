const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const redis = require("redis");
const connectRedis = require("connect-redis");
const index = require("./index.js");
const path = require("path");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));


//conexión con redis
const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    host: 'redis-14011.c10.us-east-1-4.ec2.cloud.redislabs.com',
    port: 14011,
    password: 'Vq0UBf3VLFSqxl3g67QWJzfJt6wNRfrg'
})

redisClient.on('error', function (err) {
    console.log("No se pudo conectar con redis" + err);
});

redisClient.on('connect', function(err){
    console.log("Se ha conectado exitosamente con redis");
})


//express-sessions con redis client
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secreto!',
    cookie:{
        maxAge: 1000 * 30 * 30 * 2, //tiempo de expiración de 30 minutos
        sameSite: true
    },
    store: new RedisStore({ client: redisClient })
}))

//conexión con mongodb
mongoose.connect('mongodb+srv://demo:K3ZtmMD3v4JZ1PV8@cluster0.8y2sb.mongodb.net/book2up?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex : true})
    .then(db => console.log('Connected to database'))
    .catch((error)=> console.log(error.message));

app.use(index);

app.listen(3000, () => {
    console.log("El servidor está corriendo");
});