const functions = require('firebase-functions');

var admin = require("firebase-admin");
var path = require('path');

fs = require('fs')
var serviceAccount = require('./vamdemo-49d89-firebase-adminsdk-2a6c1-ee5ab9e646.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vamdemo-49d89.firebaseio.com"
});
blog_posts={
  'one':'one.html',
  'two':'two.html'
}


const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
var if_equal=function(a, b, opts) {
          if (a == b) {
            return opts.fn(this) 
          } else {
            return opts.inverse(this)
          }
        }
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
  
  // blog_posts.on("value", function(data) {
  //   res.render('posts', {
  //     blog_posts:data.val()
  //   });
  // });

  var blog_posts = db.ref("blog");
  var blog_posts_ordered=[]
  blog_posts.orderByChild("date")
  .on("value", function(snapshot) {
    // console.log(snapshot.val())
     snapshot.forEach(function(child) {
        // console.log(child.key+': '+child.val().date);
        o=9
        if(child.val().status==1){
          console.log(o++)
          console.log(child.val().status)
        blog_posts_ordered.push(child)
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
  var db = admin.database();
  var ref = db.ref('/blog/'+request_path[2]);
  if(ref){
    ref.once("value", function(data) {
      blog_post=data.val()
      console.log(999)
      console.log(blog_post)
      if(blog_post){
        //READ FILE  MUSTACHE
        // file_path=path.resolve(__dirname, 'app/posts',html_file)
        // post_file_path=file_path
        // post_file_content=""
        // post_template_path=path.resolve(__dirname, 'app/posts/post-template.html')
        // post_template_content=""      
        // post_file_content=fs.readFileSync(post_file_path, 'utf8')//, function (err,data) {      
        // post_template_content=fs.readFileSync(post_template_path)//, 'utf8', function (err,data) {      
        // var rendered = mustache.to_html(post_template_content.toString(), {'post_content':post_file_content.toString()});   
        // res.status(200).send(rendered)
        //MUSTACHE END        
        res.status(200).render(request_path[2],{"blog_post":blog_post})
        return;
      }
      res.status(200).send('3 No Post Found :(')
      return;
    });
  } else {
    res.status(200).send(' 4 No Post Found :(')
    return;
  }
});
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);
