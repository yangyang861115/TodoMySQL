/**
 * Created by yangyang on 9/5/16.
 */
var express = require("express");
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 10,
    host: "sql3.freemysqlhosting.net",
    user: "sql3134550",
    password: "UtZlnZ3gI5",
    database: "sql3134550"
    //host: 'localhost',
    //user: 'testuser',
    //password: 'testuser',
    //database: 'todo'
});

router.get('/todo', function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            tempCont.query("select * from todos", function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
});

router.get('/todo/:id', function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var id = req.params.id;
            tempCont.query("select * from todos where id=?", id, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
});

router.post("/todo", function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var todo = req.body;
            console.log(todo);
            var query = tempCont.query("insert into todos  set ?", todo, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
            console.log(query.sql);
        }
    })
})


router.put('/todo/:id', function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var id = req.params.id;
            var todo = req.body;
            var query = tempCont.query("update todos set task= ?, date=now() where id=?", [todo.task, id], function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    res.send(200);
                }
            })
            console.log(query.sql);
        }
    })
});

router.delete('/todo/:id', function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var id = req.params.id;
            var query = tempCont.query("delete from todos where id=?", id, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    res.send(200);
                }
            })
            console.log(query.sql);
        }
    })
});

module.exports = router;