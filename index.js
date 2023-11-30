// // Сделайте сайт о вашем городе. Пусть сайт состоит из 6-ти HTML страниц. К этим страницам должен быть подключен общий CSS файл, общий JavaScript файл, добавлены картинки. На каждой странице должна быть менюшка, с помощью которой можно будет перемещаться по страницам сайта


// import http from "http";
// import fs from "fs";



// // Давайте теперь модифицируем наш сервер так, чтобы кроме HTML файлов, автоматически также выдавались запрошенные ресурсы.

//   function getMimeType(path) {
//     let mimes = {
//       html: 'text/html',
//       jpeg: 'image/jpeg',
//       jpg:  'image/jpg',
//       png:  'image/png',
//       svg:  'image/svg+xml',
//       json: 'application/json',
//       js:   'text/javascript',
//       css:  'text/css',
//       ico:  'image/x-icon',
//     };
    
//     let exts = Object.keys(mimes);

//     let extReg = new RegExp('\\.(' + exts.join('|') + ')$');
//     let ext = path.match(extReg)[1];
    
//     if (ext) {
//       return mimes[ext];
//     } else {
//       return 'text/plain';
//     }
//   }

// http
//   .createServer(async (request, response) => {
//     let text;
//     let status;
//     let path = "root" + request.url;

//     try {
//       if ((await fs.promises.stat(path)).isDirectory()) {
//         path += "/index.html";
//       }
//       status = 200;
//       text = await fs.promises.readFile(path, "utf8");
//     } catch (err) {
//       status = 404;
//       text = "page not found";
//     }
  
//     response.writeHead(status, { "Content-Type": getMimeType(path) }); // изменение
//     response.write(text);
//     response.end();
//   })
//   .listen(3000);

import http from "http";
import fs from "fs";
import path from "path";
const PORT = 3000;
const mimeType = {
  '.js': "text/javascript",
  '.html': "text/html",
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
  fs.readFile(
    "./root" + filePath,
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
    console.log(url);

    switch (url) {
      case "/":
        console.log("main page");
        staticFile(res, "/main/index.html", ".html");
        break;
      case "/nemiga":
        console.log("nemiga page");
        staticFile(res, "/nemiga/index.html", ".html");
        break;
      case "/church":
        console.log("church page");
        staticFile(res, "/church.html", ".html");
        break;
      default: 
      const extname  = String(path.extname(url)).toLowerCase();
      //проверяет наличие в объекте extname in mimeType
      
      if(extname in mimeType){
        staticFile(res,url,extname);
      }else {
        res.write(' page not found');
        res.statusCode = 404;
        res.end();
      }

    }
  })

  .listen(PORT);

