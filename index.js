const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')

const inquirer = require('inquirer')
const fs = require('fs')

const employees = [];

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "What is the team managers name?",
        name: "name"
    },
    {
        message: "What is the team managers employee ID?",
        name: "id"
    },
    {
        message: "What is the team managers email?",
        name: "email"
    },
    {
        message: "What is the team managers office number?",
        name: "office"
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
    }])
        .then(function ({ name, id, email, office, role }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office number"
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add another member to this team?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    }
                    else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    }
                    else {
                        newMember = new Manager(name, id, email, roleInfo)
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                addMember();
                            }
                            else {
                                finishHtml();
                            }
                        });
                });
        });
}