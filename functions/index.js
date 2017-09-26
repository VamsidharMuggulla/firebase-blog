const functions = require('firebase-functions');

var admin = require("firebase-admin");
var path = require('path');

fs = require('fs')
// var serviceAccount = require('./vamdemo-49d89-firebase-adminsdk-2a6c1-ee5ab9e646.json');
var serviceAccount = require('./perkpayroll-com-firebase-adminsdk-ml912-95212aa7f5.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perkpayroll-com.firebaseio.com"
});
blog_posts={
  'one':'one.html',
  'two':'two.html'
}


const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
//IF_EQUAL 
var if_equal=function (lvalue, operator, rvalue, options) {

    var operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

}
//IF_EQUAL ENDS
app.engine('handlebars', exphbs({defaultLayout: 'main',helpers : { 
        if_equal : if_equal
      }
    })
);
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
  var db = admin.database();
  var blog_posts = db.ref("blog");
  blog_posts.once("value", function(data) {
    blog_posts=data.val()
    res.render('posts', {
      blog_posts:blog_posts 
    });
  });
});


app.get('/blog', (req, res) => {
  var db = admin.database();
  var blog_posts = db.ref("blog");
  var blog_posts_ordered=[]
  blog_posts.orderByChild("date")
  .on("value", function(snapshot) {
    // console.log(snapshot.val())
     snapshot.forEach(function(child) {
        // console.log(child.key+': '+child.val().date);
        if(child.val().status==1){          
        blog_posts_ordered.push({
          'url':child.key,
          'date':new Date(child.val().date).toDateString(),
          'title':child.val().title,
          'description':child.val().description
        })
        console.log({
          'url':child.key,
          'date':new Date(child.val().date).toDateString(),
          'title':child.val().title,
          'description':child.val().description
        });
      }
     });
     // console.log(blog_posts_ordered)
    res.render('posts', {
      blog_posts:blog_posts_ordered
    });
});  
});

app.get('/blog/*',(req, res) => {
  const request_path = req.path.split('/');
  if (request_path.length < 3 || request_path[1] !== 'blog') {
    res.status(404).send('2 No Post Found found :(');
    return;
  }
  //GET BLOG POST
  var db = admin.database();
  var ref = db.ref('/blog/'+request_path[2]);
  if(ref){
    ref.once("value", function(data) {
      blog_post=data.val()
      if(blog_post){
        //GET BLOG POSTS LIST
        var db = admin.database();
        var blog_posts = db.ref("blog");
        var blog_posts_ordered=[]
        blog_posts.orderByChild("date")
        .on("value", function(snapshot) {
          // console.log(snapshot.val())
           snapshot.forEach(function(child) {
              // console.log(child.key+': '+child.val().date);
              if(child.val().status==1){
              blog_posts_ordered.push(child)
            }
           });
         })
           //GET BLOG POSTS LIST END
        res.status(200).render(request_path[2],{"blog_post":blog_post,'blog_posts':blog_posts_ordered})
        return;
      }
      res.redirect('/blog/')
      return;
    });
  } else {
    res.redirect('/blog/')
    return;
  }
  //GET BLOG POST ENDS
});
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);
