const express = require('express'),
router = express.Router(),
warez = require('../middleware/warez'),
User = require('../db/models/users'),
Todo = require('../db/models/todos');

// GET /
router.get("/", warez.checkUser, (req, res) => {
  User.findOne({
    username: req.user.username
  })
    .populate("todos")
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        let todosRev = user.todos.slice().reverse();
        let todosFinal = todosRev.filter(todo => todo.important).concat(todosRev.filter(todo => !todo.important));
        res.render("index", {
          index: true,
          css: "/css/index.css",
          username: user["username"],
          todos: todosFinal
        });
      }
    });
});

// POST /
router.post("/", warez.checkUser, (req, res) => {
  console.log("Current user:\n" + req.user + '\n');
  Todo.create({
    todo: req.body.todo,
    owner: req.user._id
  })
  .then(todo => {
    User.findById(req.user._id)
    .exec()
    .then(user => {
      user.todos.push(todo);
      user.save();
      res.redirect('/');
    })
  })
  .catch(err => {
    console.error("Oops!\n" + err);
    res.redirect('/');
  });  
});

// PUT /:todoID/done
router.put("/:todoID/done", warez.checkUser, (req, res) => {
  Todo.findOne({
      _id: req.params.todoID
  })
    .exec()
    .then(todo => {
        todo.done = !todo.done;
        todo.save();
        console.log("\n================\nUpdate done TODO:\n" + todo + "\n======================\n");
        res.redirect('/');
    })
    .catch(err => {
        console.error("Could not 'done' todo!", err);
        res.redirect('/');
    })
});

// DELETE /:todoID
router.delete('/:todoID', warez.checkUser, (req, res) => {
    Todo.findByIdAndRemove(req.params.todoID, (err, todo) => {
        if (err) console.log("Could not delete todo!", err);
        console.log("\n================\nDeleted TODO:\n" + todo + "\n======================\n");
        res.redirect('/');
    });
});

// PUT /:todoID/priority
router.put('/:todoID/priority', warez.checkUser, (req, res) => {
    Todo.findById(req.params.todoID, (err, todo) => {
      if (err || !todo) console.error("Oops: ", err, todo);
      todo.important = !todo.important;
      todo.save();
      console.log("\n================\nUpdate priority TODO:\n" + todo + "\n======================\n");
      res.redirect('/');
    })    
})

module.exports = router;