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

const questions = [
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
        type: "list",
        name: "role",
        message: "Would you like add an Engineer or Intern? Select None to finish building your team",
        choices: [
            "Engineer",
            "Intern",
            "None"
        ],
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

// Manager Questions
managerQuestions = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number? (Required)",
        validate: office => {
            if (office) {
              return true;
            } else {
              console.log("You need to provide an office number!");
              return false;
            }
          }
    }
]


// Choose to create a new employee
const createQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of this employee?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the ID of this employee?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this employee's email?"
    },
    {
        type: "list",
        name: "role",
        message: "What role does this employee have?",
        choices: ["Engineer", "Intern", "Manager"]
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
            if (await success === true) {
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
            else if (role === "Intern") {
                inquirer.prompt(internQuestions).then((response) => {
                    school = response.school;
                    let employee = new Intern(name, id, email, school);
                    employeesArr.push(employee);
                    addEmployee(employeesArr);
                });
            }
            else if (role === "None") {
                console.log("Success! Your html file has been created.")
                if (!fs.existsSync(fileDirectory)) {
                    fs.mkdirSync(fileDirectory)
                    fs.writeFile(filePath, renderHTML(array))
                }
    
            }
        });
};


const teamEmployee = async () => {
    await inquirer.prompt(createQuestions)
      .then((response) => {
        let name = response.name;
        let id = response.id;
        let email = response.email;
        let role = response.role;
        let officeNumber;
        let github;
        let school;

        if (role === "Engineer") {
        inquirer.prompt(engineerQuestions).then((response) =>{
            github = response.github;
            let employee = new Engineer(name, id, email, github);
            employeesArr.push(employee);
            addEmployee(employeesArr);
            });
        }
        else if (role === "Manager") {
            inquirer.prompt(managerQuestions).then((response) =>{
                    officeNumber = response.office;
                    let employee = new Manager(name, id, email, office);
                    employeesArr.push(employee);
                    addEmployee(employeesArr);
                });
            }
        else if (role === "Intern") {
            inquirer.prompt(internQuestions).then((response) =>{
                    school = response.school;
                    let employee = new Intern(name, id, email, school);
                    employeesArr.push(employee);
                    addEmployee(employeesArr);
                });
        }

    });    

};

const addEmployee = async (array) => {
    await inquirer.prompt({
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?"
    })
        .then(async (response) => {
            var createEmployee = response.addEmployee;
            if (await createEmployee === true) {
                teamEmployee();
            }
            else if (await createEmployee === false) {
                if (fs.existsSync(fileDirectory)) {
                    fs.mkdirSync(fileDirectory)
                }

                fs.writeFile(filePath, renderHTML(array), (err) => {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("Success! Your index.html file has been created.");
                });
            }
        });
}










init();
