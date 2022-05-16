const AppHtml = 

`<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-light bg-light">
<div class="container-fluid">
    <a class="navbar-brand" href="#">Emloyee Directory</a>
</div>
</nav>
    <div class="container" style="max-width:400px;">
        {{ content }}
    </div>
</body>
</html>`;

module.exports = AppHtml;