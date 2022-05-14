const Employee = require('./Employee')

class Intern extends Employee {
    constructor (
        name, employeeID, email, officenumber
    ){
        super(name, employeeID, email)
        this.officenumber = officenumber
    } 
    getOfficenumber() {
    return this.officenumber
    } 
    getRole() {
        return ('Manager')
    }
}

module.exports = Manager 