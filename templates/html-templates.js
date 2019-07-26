
exports.HtmlTemplate = class {
  constructor(){

  }
  get template(){
      return this.createTemplate();
  }

  createTemplate(){
    return this.html_basic()
  }

  html_basic(){
    return( `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML PAGE</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
  `)
  }
}


