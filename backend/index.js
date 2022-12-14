const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const mysql2 = require('mysql2');
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());
io.on('connection', (socket)=>{
    console.log('a user connected');
});

server.listen(3000,()=>{
    console.log('listening on port 3000');
});

//database connection
const db = mysql2.createConnection({
    host: 'hostingmysql335.amen.pt',
    user: 'RodriMidas19',
    password:'ofixe19.2005R',
    database: 'db_escola'
});

//Check database connection
db.connect(err=>{
    if(err){console.log(err,'dberr');}
    else {console.log('database connected...');}
});

//get all data
app.get('/task',(req,res)=>{
    let qr = `SELECT * FROM tasks`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message: 'all tasks data',
                data: result
            });
        }
    });
});

//Get single data task
app.get('/task=:id',(req,res)=>{
    let getID = req.params.id;
    let qr = `SELECT * FROM tasks WHERE id = ${getID}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message: 'get single data',
                data: result
            });
        }else{
            res.send({
                message: 'data not found'
            });
        }
    });
});
app.delete('/task=:id',(req,res)=>{
    let getid=req.params.id;
    let qr=`DELETE FROM tasks WHERE id = ${getid}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'data deleted',
                data:result
            });
        }else{
            res.send({
                message:'data not found',
            });
        }
    });
});
app.post('/task',(req,res)=>{
    console.log(req.body,'createdata');

    let Title = req.body.title;
    let Task = req.body.task;

    let qr = `INSERT INTO tasks (id_user,task,title) VALUES ('1','${Task}','${Title}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        console.log(result,'result');
        res.send({
            message: 'data inserted'
        });
    });
});
//Update sigle data
app.put('/task=:id',(req,res)=>{
    console.log(req.body,'update Data');

    let getID  = req.params.id;
    let title = req.body.title;
    let task = req.body.task;

    let qr = `UPDATE tasks SET task = '${task}',title = '${title}' WHERE id = ${getID}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        res.send({
            message: 'Data updated'
        });
    });
});