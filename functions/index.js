const functions = require('firebase-functions');

var admin = require("firebase-admin");
var path = require('path');
var site_root = path.resolve(__dirname+'/..');

var serviceAccount = require(site_root+'/'+'vamdemo-49d89-firebase-adminsdk-2a6c1-ee5ab9e646.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vamdemo-49d89.firebaseio.com"
});


blog_posts={
  'one':'one.html',
  'two':'two.html'
}

exports.blog = functions.https.onRequest((req, res) => {
  res.status(200).sendFile(site_root+'/app/index.html')  
});

exports.blogpost = functions.https.onRequest((req, res) => {

  const request_path = req.path.split('/');

  // console.log(blog_posts['one'])
  // console.log(req.query)
  // console.log(request_path[2])
  // console.log(blog_posts[request_path[2]])

  if (request_path.length < 3 || request_path[1] !== 'blog') {
    res.status(404).send('No Post Found found :(');
    return;
  }
  // var db = admin.database();
  // var ref = db.ref("blog");
  // ref.once("value", function(data) {
  //   console.log(data.val());
  // });
  var db = admin.database();
  var ref = db.ref(request_path[2]);
  if(ref){
    ref.once("value", function(data) {
      html_file=data.val()
      if(html_file){
        file_path=site_root+'/app/posts/'+html_file
        res.status(200).sendFile(file_path)  
        return; 
      }
      res.status(200).send('No Post Found :(')
      return;
    });
  }
  
  
  // if(blog_posts[request_path[2]]){
  //    res.status(200).sendFile(site_root+'/app/'+blog_posts[request_path[2]])  
  //    return; 
  // }
});