const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport');
require('./passport')
const cookieSession = require('cookie-session');
connectDB();
const authRoute = require('./routes/auth');
const itineraryRoute = require('./routes/itineraryDataHandler');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cookieSession({
        name: 'session',
        keys: ['trip-planner'],
        maxAge: 24 * 60 * 60 * 1000
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}));

const port = 5000 || process.env.port;

app.use("/auth",authRoute);
app.use("/itineraries",itineraryRoute);
app.listen(port,()=>{
    console.log(`server started on port ${port}!`);
})