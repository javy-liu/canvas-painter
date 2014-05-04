var app = require('http').createServer(handler)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
	
  var path = './index.html';
  if (req.url != "/") {
  	path = "."+ req.url;
  };
  fs.readFile(path,

  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    if (path.indexOf(".html") !=-1) {
      if (path.indexOf(".js") != -1) {
        res.writeHeader(200, {"Content-Type": "text/javascript"});  
      };
      if (path.indexOf(".css") != -1) {
        res.writeHeader(200, {"Content-Type": "text/css"});  
      }else{
        res.writeHeader(200, {"Content-Type": "text/html"});  
      };
      
    }else{
      res.writeHeader(200); 
    }

    res.end(data);
  });
}


 
