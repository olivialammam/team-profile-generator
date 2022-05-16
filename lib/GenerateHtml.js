const path = require("path");
const fs = require("fs");

function generateMarkdown(data) {
    return `

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <!-- Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <!-- Custom CSS file -->
    <link rel="stylesheet" href="../assets/styles/style.css">

</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 bg-dark text-white">
                <h1 class="text-center"><span class="material-icons">groups</span> My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex flex-wrap justify-content-between bg-secondary p-3">
                {{ team }}
            </div>
        </div>
    </div>

    <div class="card employee-card mr-1 mt-3">
    <div class="card-header">
        <h2 class="card-title">${data.name}</h2>
        <h3 class="card-title bg-info"><span class="material-icons">laptop_mac</span>${data.role}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item"><span class="material-icons">fingerprint</span>ID:${data.id}</li>
            <li class="list-group-item"><span class="material-icons">business</span>Office Number:${data.office}</li>
            <li class="list-group-item text-dark"><span class="material-icons">email</span>Email: <a href="mailto:${data.email}">${data.email}</a></li>
            <li class="list-group-item text-dark"><span class="material-icons">code</span>GitHub: <a href="https://github.com/${data.github}" target="_blank">${data.github}</a></li>
        </ul>
    </div>
</div>
</body>

</html> 

`;
}

module.exports = generateMarkdown;