const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')

const inquirer = require('inquirer')
const fs = require('fs')
const path = require("path");

const AppHtml = require("./src/app");
const EmployeeHtml = require("./src/employee");

let employees = [];
let employeeIds = [];
let employeeEmails = [];
let githubUsernames = [];


const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter {{ employee }}'s name:",
        default: '',
        validate: function(input) {
            if (input == null || input.trim() == '') {
                return 'You must enter a name!';
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter {{ employee }}'s employee ID:",
        default: '',
        validate: function(input) {
            let num = Number.parseInt(input);

            if (employeeIds.includes(num)) {
                return 'Invalid ID';
            }

            if (Number.isNaN(num)) {
                return 'This is not a number!';
            }

            employeeIds.push(num);

            return true;
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter {{ employee }}'s email address:",
        default: '',
        validate: function(input) {
            let email = input.toLowerCase();

            if (employeeEmails.includes(email)) {
                return 'Invalid email';
            }

            const regex = new RegExp(/^.+\@.+$/);
            if (!regex.test(input)) {
                return 'Employee email is missing';
            }

            employeeEmails.push(email);

            return true;
        }
    }
];

function generateHtml() {
    let html = AppHtml;
    let content = '';
    let other = '';

    employees.forEach(function(employee) {
        content += EmployeeHtml(employee);
    });

    html = html.replace('{{ content }}', content);
    writeToFile('./dist/index.html', html);
}

function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, err => {
      if (err) {
        console.error(err);
      }
    });
  }

function addEmployee(role) {
    let questions = [];

    employeeQuestions.forEach(function(question) {
        let newQuestion = Object.assign({}, question);
        newQuestion.message = newQuestion.message.replace('{{ employee }}', role);
        questions.push(newQuestion);
    });

    if (role == 'Manager') {
        questions.push({
            type: 'input',
            name: 'office',
            message: "Enter Manager's office number:",
            default: '',
            validate: function(input) {
                if (input == null || input.trim() == '') {
                    return 'You must enter a office number!';
                }
    
                return true;
            }
        });
    }

    if (role == 'Engineer') {
        questions.push({
            type: 'input',
            name: 'github',
            message: "Enter Engineer's GitHub username:",
            default: '',
            validate: function(input) {
                let username = input.toLowerCase();

                if (githubUsernames.includes(username)) {
                    return 'Invalid input';
                }

                if (username.trim() == '' || username == null) {
                    return 'Username is required';
                }

                githubUsernames.push(username);
    
                return true;
            }
        })
    }

    if (role == 'Intern') {
        questions.push({
            type: 'input',
            name: 'school',
            message: "Enter Intern's school:",
            default: '',
            validate: function(input) {
                if (input == null || input.trim() == '') {
                    return 'School name is required';
                }
    
                return true;
            }
        })
    }

    questions.push({
        type: 'list',
        name: 'addEmployee',
        message: "Add employee or finish:",
        choices: [
            'Engineer',
            'Intern',
            'Finish',
        ],
    });

    inquirer
    .prompt(questions) 
    .then((answers) => {
        let employee;

        if (role == 'Manager') {
            employee = new Manager(answers.id, answers.name, answers.email);
            employee.officeNumber = answers.officeNumber;
        }

        if (role == 'Engineer') {
            employee = new Engineer(answers.id, answers.name, answers.email);
            employee.github = answers.github;
        }

        if (role == 'Intern') {
            employee = new Intern(answers.id, answers.name, answers.email);
            employee.school = answers.school;
        }

        employees.push(employee);

    
        if (answers.addEmployee != 'Finish') {

            addEmployee(answers.addEmployee);
            return;
        }  

        generateHtml();
    })
    .catch((error) => {
      console.log(error)
    });
}

function init() {
    addEmployee('Manager');
}


// // Questions

// const questions = [
//     {
//         type: "input",
//         name: "name",
//         message: "What is the team manager's name?"
//     },
//     {
//         type: "input",
//         name: "id",
//         message: "What is the team manager's employee ID?"
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "What is the team manager's email?"
//     },
//     {
//         type: "input",
//         name: "office",
//         message: "What is the team manager's office number?"
//     },
//     {
//         type: "list",
//         name: "role",
//         message: "Would you like add an Engineer or Intern? Select None to finish building your team",
//         choices: [
//             "Engineer",
//             "Intern",
//             "None"
//         ],
//     }]

// // Engineer Questions
// engineerQuestions = [
//     {
//         type: "input",
//         name: "github",
//         message: "What is the engineer's Github Username? (Required)",
//         validate: github => {
//             if (github) {
//                 return true;
//             } else {
//                 console.log("You need to provide a GitHub username!");
//                 return false;
//             }
//         }
//     }
// ]

// // Intern Questions
// internQuestions = [

//     {
//         type: "input",
//         name: "school",
//         message: "What school is the intern from? (Required)",
//         validate: school => {
//             if (school) {
//                 return true;
//             } else {
//                 console.log("You need to provide a school name!");
//                 return false;
//             }
//         }
//     }
// ]

// // Manager Questions
// managerQuestions = [
//     {
//         type: "input",
//         name: "office",
//         message: "What is the manager's office number? (Required)",
//         validate: office => {
//             if (office) {
//               return true;
//             } else {
//               console.log("You need to provide an office number!");
//               return false;
//             }
//           }
//     }
// ]


// // Choose to create a new employee
// const createQuestions = [
//     {
//         type: "input",
//         name: "name",
//         message: "What is the name of this employee?"
//     },
//     {
//         type: "input",
//         name: "id",
//         message: "What is the ID of this employee?"
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "What is this employee's email?"
//     },
//     {
//         type: "list",
//         name: "role",
//         message: "What role does this employee have?",
//         choices: ["Engineer", "Intern", "Manager"]
//     }
// ]



//     const init = () => {
//         if (fs.existsSync(filePath)) {
//             inquirer.prompt({
//                 type: "confirm",
//                 message: "It looks like the index.html file in the 'dist' folder already exists. Do you want to overwrite it?",
//                 name: "overwrite"
//             }).then(async (response) => {
    
//                 let overwrite = response.overwrite;
//                 if (await overwrite === true) {
//                     console.log("Please enter your team information:")
//                     newEmployee()
//                 } else if (await overwrite === false) {
//                     console.log("Your index.html file in the 'dist' folder will not be overwritten.")
//                 }
//             })
//         } else {
//             console.log("Add your team information below to generate the html file:")
//             newEmployee()
//         }
//     };   

    

// const newEmployee = async () => {
//     await inquirer.prompt(questions)
//         .then((response) => {
//             let name = response.name;
//             let id = response.id;
//             let email = response.email;
//             let role = response.role;
//             let office;
//             let github;
//             let school;

//             if (role === "Engineer") {
//                 inquirer.prompt(engineerQuestions).then((response) => {
//                     github = response.github;
//                     let employee = new Engineer(name, id, email, github);
//                     employeesArr.push(employee);
//                     addEmployee(employeesArr);
//                 });
//             }
//             else if (role === "Intern") {
//                 inquirer.prompt(internQuestions).then((response) => {
//                     school = response.school;
//                     let employee = new Intern(name, id, email, school);
//                     employeesArr.push(employee);
//                     addEmployee(employeesArr);
//                 });
//             }
//             else if (role === "None") {
//                 console.log("Success! Your html file has been created.")
//                 if (!fs.existsSync(fileDirectory)) {
//                     fs.mkdirSync(fileDirectory)
//                     fs.writeFile(filePath, renderHTML(array))
//                 }
    
//             }
//         });
// };


// const teamEmployee = async () => {
//     await inquirer.prompt(createQuestions)
//       .then((response) => {
//         let name = response.name;
//         let id = response.id;
//         let email = response.email;
//         let role = response.role;
//         let office;
//         let github;
//         let school;

//         if (role === "Engineer") {
//         inquirer.prompt(engineerQuestions).then((response) =>{
//             github = response.github;
//             let employee = new Engineer(name, id, email, github);
//             employeesArr.push(employee);
//             addEmployee(employeesArr);
//             });
//         }
//         else if (role === "Manager") {
//             inquirer.prompt(managerQuestions).then((response) =>{
//                     office = response.office;
//                     let employee = new Manager(name, id, email, office);
//                     employeesArr.push(employee);
//                     addEmployee(employeesArr);
//                 });
//             }
//         else if (role === "Intern") {
//             inquirer.prompt(internQuestions).then((response) =>{
//                     school = response.school;
//                     let employee = new Intern(name, id, email, school);
//                     employeesArr.push(employee);
//                     addEmployee(employeesArr);
//                 });
//         }

//     });    

// };

// const addEmployee = async (array) => {
//     await inquirer.prompt({
//         type: "confirm",
//         name: "addEmployee",
//         message: "Would you like to add another employee?"
//     })
//     .then(async (response) => {
//         var createEmployee = response.addEmployee;
//         if (await createEmployee === true) {
//             teamEmployee();
//         } 
//         else if (await createEmployee === false) {
           
//             if (!fs.existsSync(fileDirectory)) {
//                 fs.mkdirSync(fileDirectory)
//             }

//             fs.writeFile(filePath, renderHTML(array), (err) => {
        
        
//                 if (err) {
//                     return console.log(err);
//                 }
                

//                     console.log("Success! Your index.html file has been created.");
//                 });
//             }
//         });
// }


// function writeToFile(fileName, data) {
//     return fs.writeFileSync(path.join(process.cwd(),fileName), data);
// }


// const init = () => {
//     inquirer.prompt(questions).then(response => {
//         writeToFile('index.html', generateMarkdown({...response}))
//     })
// }








init();
