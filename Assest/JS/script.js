// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

const employeesArray = [];

// Collect employee data
const collectEmployees = function(){
// TODO: Get user input to create and return an array of employee objects
  let employee = {firstName:"", lastName:"", salary:0}           
  function continueInput(){                                       // this function is created to re-use the prompts after it's been used the first time as we needing more than 1 employee's information. this function is re-used as a loop as many entries as needed until user chooses cancel to stop adding more employees

  employee.firstName = prompt("Enter first name");
  employee.lastName = prompt("Enter last name");                  // this sections prompts the 3 questions we need answered to collect the data regarding the employee
  employee.salary = parseFloat(prompt ("Enter salary"));

  if (isNaN (employee.salary)){
    alert("Entry was not a number, default to zero")              // this section will not allow any letters used as salaray. it'll enter the first and last name but the salary will default to $0
    employee.salary = 0 
  }

  employeesArray.push({...employee});                            // adding {...} inside (employee) allowed me to log more than 1 employee. When i didn't have this inside, it kept logging the LAST employee 3x's instead of have 3 different employees.
}

do {                                                            // here i am telling the program to run this function again and to ask the user if they want to add another employee
  continueInput();

  let addAnother = confirm("Add another employee?")
  if (!addAnother) break;                                       // (!addAnother) means if its false. it is false that the user wants to add another employee. "break" end the loop that started with "do" which would be the function created to repeat 

} while (true);

  return employeesArray;                                        // outside of loop because the loop has come to an end which then returns all the employee data that was collected during the loop process

}


// Display the average salary
const displayAverageSalary = function(employeesArray) {       // function "displayAverageSalary" is taking the date from employeesArray to calculate the average salary of the employee data collected
// TODO: Calculate and display the average salary

  let total = 0;                                             // starting variable is 0

  for (let i=0; i < employeesArray.length; i++){            // this loop is for going through each "employee" 
    total += employeesArray[i].salary                       // this adds the salary of each employee to total which was set at 0
  }
  let avg = total / employeesArray.length;                  // this is finding the average of the salaries entered by dividing the total salary by the # of employeyes
  console.log(`The average salary between our ${employeesArray.length} empployees is ${avg}`)              
  
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {                        // functions called "getRandomEmployee" - this is where a random employee will be selected from the array created as "employeesArray" which contains the data user entered.
  // TODO: Select and display a random employee

  var randomIndex = Math.floor(Math.random() * employeesArray.length);     
  var randEmp = employeesArray[randomIndex];
  console.log(`Congratulations to ${randEmp.firstName} ${randEmp.lastName} our random drawing winner!`)
 }


/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
