const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
// const config = require('../Configs/database');

// CONNECT TO DATABASE
mongoose.connect(process.env.DATABASE_URL || config.database, {
    useNewUrlParser: true
});

// WHEN CONNECTED TO DAtABASE
mongoose.connection.on('connected', () => {
    console.log('CONNECTED TO DB');
});

// IF CONNECTION RESULTS IN ERROR
mongoose.connection.on('error', (err) => {
    console.log(err);
});


const app = express();
const port = process.env.PORT || 3000;
const mainRoute = require('./routes/mainRoute');
const users = require('./routes/users');
const registrationData = require('./routes/registrationDataRoute');
const testRoute = require('./routes/testsRoute');
const questionImage = require('./routes/fileUpload');
const studentDashboard = require('./routes/studentDashboardRoute');
const teacherDashboard = require('./routes/teacherDashboardRoute');
const videos = require('./routes/videos');

// to eliminate the CORS error : Other apps can request the API 
app.use(cors());


// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use('/', mainRoute);
app.use('/users', users);
app.use('/registrationData', registrationData);
app.use('/testRoute', testRoute);
app.use('/upload', questionImage);
app.use('/student', studentDashboard);
app.use('/teacher', teacherDashboard);
app.use('/api/v1/videos', videos)

// Index route
app.get('/', (req, res) => {
    res.send('INVALID ROUTE');
});


// START the serve
app.listen(port, () => {
    console.log('Server started on PORT :' + port);
});