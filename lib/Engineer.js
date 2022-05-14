
const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(
        name, employeeID, email, github
    ) {
        super(name, employeeID, email)
        this.github = github
    }
    getGithub() {
        return this.github
    }
    getRole() {
        return ('Engineer')
    }
}

module.exports = Engineer;