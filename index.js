const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')

const inquirer = require('inquirer')
const fs = require('fs')

//  Questions
const questions = [
        // Managagers Name
        {
            type: 'input',
            name: 'managername',
            message: 'What is the team managers name? (Required)',
            validate: managernameInput => {
                if (managernameInput) {
                    return true;
                } else {
                    console.log('You need to provide your team managers name!');
                    return false;
                }
            }
        },
        // Employee ID
        {
            type: 'input',
            name: 'employeeid',
            message: 'What is your employee ID? (Required)',
            validate: employeeidInput => {
                if (employeeidInput) {
                    return true;
                } else {
                    console.log('You need to provide your employee ID!');
                    return false;
                }
            }
        },
        // Email Address
        {
            type: 'input',
            name: 'email',
            message: 'What is your email? (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('You need to provide your email!');
                    return false;
                }
            }
        },
        // Office Number
        {
            type: 'input',
            name: 'office',
            message: 'What is your office number? (Required)',
            validate: officeInput => {
                if (officeInput) {
                    return true;
                } else {
                    console.log('You need to provide your office number!');
                    return false;
                }
            }
        },
        // Add a Engineer or Intern or To finish building the team
        {
            type: 'checkbox',
            name: 'team',
            message: 'Would you like add an Engineer or Intern? Select None to finish building your team (Select one)',
            choices: ['Engineer', 'Intern', 'None'],
            validate: teamInput => {
                if (teamInput) {
                    return true;
                } else {
                    console.log('You must pick a an option!');
                    return false;
                }
            }
            // }, 
            // choices: Engineer => {
            //     if (Engineer) {
            //         return true;
    
            // }
        },

        // Engineer Option
    
                // Engineers Name
        {
            type: 'input',
            name: 'engineername',
            message: 'What is the engineers name? (Required)',
            validate: engineernameInput => {
                if (engineernameInput) {
                    return true;
                } else {
                    console.log('You need to provide the engineers name!');
                    return false;
                }
            }
        },
        // Employee ID
        {
            type: 'input',
            name: 'engineerid',
            message: 'What is the engineers employee ID? (Required)',
            validate: engineeridInput => {
                if (engineeridInput) {
                    return true;
                } else {
                    console.log('You need to provide an employee ID!');
                    return false;
                }
            }
        },
        // Email Address
        {
            type: 'input',
            name: 'engineeremail',
            message: 'What is the engineers email? (Required)',
            validate: engineeremailInput => {
                if (engineeremailInput) {
                    return true;
                } else {
                    console.log('You need to provide an email address!');
                    return false;
                }
            }
        },
        // GitHub Username
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers GitHub username? (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('You need to provide a GitHub username!');
                    return false;
                }
            }
        },

        






    
];

//intern questions functions inquirer questions

//callback to create 