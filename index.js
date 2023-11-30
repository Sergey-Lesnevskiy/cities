import http from "http";
import fs from "fs";
import path from "path";
const PORT = 3000;
const mimeType = {
  '.js': "text/javascript",
  // '.html': "text/html",
  '.css': "text/css",
  '.json': "application/json",
  '.image': "image/x-icon",
  '.svg': "image/svg+xml",
  '.png': "image/png",
  '.jpg': "image/jpg",
  '.jpeg': "image/jpeg",
  '.ico': "image/vnd.microsoft.icon",
  '.webp': "image/webp",

};

function staticFile(res, filePath, ext) {
  res.setHeader("Content-Type", mimeType[ext]);
  console.log(filePath);
  fs.readFile(
    "./root/pages" + filePath,
    // { encoding: "utf8", flag: "r" },
    (error, data) => {
      if (error) {
        res.statusCode = 404;
        console.log(error);
      }
      res.end(data);
    }
  );
}

http
  .createServer(function (req, res) {
    const url = req.url;
    // console.log(url);

    // switch (url) {
    //   case "/":
    //     console.log("main page");
    //     staticFile(res, "/main/index.html", ".html");
    //     break;
    //   case "/nemiga":
    //     console.log("nemiga page");
    //     staticFile(res, "/nemiga/index.html", ".html");
    //     break;
    //   case "/church":
    //     console.log("church page");
    //     staticFile(res, "/church.html", ".html");
    //     break;
    //   case "/authorization":
    //     console.log("authorization page");
    //     staticFile(res, "/authorization.html", ".html");
    //     break;
    //   default: 
      const extname  = String(path.extname(url)).toLowerCase();
      //проверяет наличие в объекте extname in mimeType
      
      if(extname in mimeType){
        console.log('here');
        staticFile(res, url, extname);
      }else {
        // res.write(' page not found');
        // res.statusCode = 404;
        // res.end();
        console.log('hi');
        getPage(url, res, extname)
      }

    // }
  })
  .listen(PORT);

  function getPage(name, res, statusCode = 200,) {
    if (name == "/") {
      name = "/main";
    }
    console.log("root/pages" + name + "/index.html");

    fs.readFile("root/pages" + name + "/index.html",'utf8' ,(err, data) => {
      if (!err) {
        fs.readFile("root/elems/menu.html",'utf8', (err, menu) => {
          if(err) throw err;
          data = data.replace(/\{\{menu\}\}/, menu)
          fs.readFile("root/elems/footer.html",'utf8', (err, footer) => {
            if(err) throw err;

            data = data.replace(/\{\{my_git\}\}/, footer)

            res.setHeader("Content-Type", "text/html");
            // res.statusCode = statusCode;
            res.write(data);
            res.end();
          })
      
        })
      } 
      // else if (extname in mimeType) {
      //   staticFile(res, name, extname);
      
      // }
      else {
        if (statusCode!=404){
          getPage("/404", res, 404);
        }else {
          throw err;
        }
      }
    });
  }