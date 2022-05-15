const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')

const inquirer = require('inquirer')
const fs = require('fs')
const path = require("path");
const fileDirectory = path.resolve(__dirname, "dist");
const filePath = path.join(fileDirectory, "index.html");

let employeesArr = [];


// Questions

const questions =[
    {
        type: "input",
        name: "name",
        message: "What is the team manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the team manager's employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's email?"
    },
    {
        type: "input",
        name: "office",
        message: "What is the team manager's office number?"
    },
    {
        type: "checkbox",
        message: "Would you like add an Engineer or Intern? Select None to finish building your team",
        choices: [
            "Engineer",
            "Intern",
            "None"
        ],
        name: "role"
    }]

    // Engineer Questions
    engineerQuestions = [
        {
            type: "input",
            name: "github",
            message: "What is the engineer's Github Username? (Required)",
            validate: github => {
                if (github) {
                  return true;
                } else {
                  console.log("You need to provide a GitHub username!");
                  return false;
                }
              }
        }
    ]

    // Intern Questions
    internQuestions = [

        {
            type: "input",
            name: "school",
            message: "What school is the intern from? (Required)",
            validate: school => {
                if (school) {
                  return true;
                } else {
                  console.log("You need to provide a school name!");
                  return false;
                }
              }
        }
    ]



const init = () => {
    if (fs.existsSync(filePath)) {
        inquirer.prompt({
            type: "confirm",
            message: "create your new HTML file",
            name: "success"
        }).then(async (response) => {
            let success = response.success;
            if (await overwrite === true) {
                console.log("Provide your team member's information below")
                newEmployee()
            } else if (await success === false) {
                console.log("Your file has not been created")
            }
        })
    } else {
        console.log("Create your team")
        newEmployee()
    }
}

const newEmployee = async () => {
    await inquirer.prompt(questions)
    .then((response) => {
        let name = response.name;
        let id = response.id;
        let email = response.email;
        let role = response.role;
        let office;
        let github;
        let school;

        if (role === "Engineer") {
            inquirer.prompt(engineerQuestions).then((response) => {
                github = response.github;
                let employee = new Engineer(name, id, email, github);
                employeesArr.push(employee);
                addEmployee(employeesArr);
            });
        }
        
    })
}










init();
