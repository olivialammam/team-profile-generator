const EmployeeHtml = function(employee) {

    if (employee.getRole() == 'Engineer') {
        other = `GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a>`;
    } else if (employee.getRole() == 'Intern') {
        other = `School: ${employee.getSchool()}`;
    } else if (employee.getRole() == 'Manager') {
        other = `Office: ${employee.getOffice()}`
    }
    
    return `
<div class="row mt-5">
    <div class="column">
        <div class="card">
            <h5 class="card-header">${employee.getName()}</h5>
            <div class="card-body">
                <h5 class="card-title">${employee.getRole()}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Id: ${employee.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item">${other}</li>
            </ul>
        </div>
    </div>
</div>`;
}

module.exports = EmployeeHtml;