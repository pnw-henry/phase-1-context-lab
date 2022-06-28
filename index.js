function createEmployeeRecord(employeeArray){
    
    const employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObj
}

function createEmployeeRecords(nestedArrray){
    
    const employeeRecords = [];
    let employeeEntry = 0;
    
    for (const employee of nestedArrray){
        employeeRecords[employeeEntry] = createEmployeeRecord(employee);
        employeeEntry++;
    }
    
    return employeeRecords;

}

function createTimeInEvent(timeStamp){

    let updatedRecord;
    const dateHourSplit = timeStamp.split(' ');
    const timeObj = {
        type: 'TimeIn',
        hour: parseInt(dateHourSplit[1]),
        date: dateHourSplit[0]
    };

    this.timeInEvents.push(timeObj);
    return this
}

function createTimeOutEvent(timeStamp){

    let updatedRecord;
    const dateHourSplit = timeStamp.split(' ');
    const timeObj = {
        type: 'TimeOut',
        hour: parseInt(dateHourSplit[1]),
        date: dateHourSplit[0]
    };

    this.timeOutEvents.push(timeObj);
    return this
}

function hoursWorkedOnDate(date){
    
    let hoursWorked;
    let workDate = this.timeInEvents[0].date;
    let timeOut = this.timeOutEvents[0].hour;
    let timeIn = this.timeInEvents[0].hour;
    
    if (workDate === date){
        hoursWorked = timeOut - timeIn;
    }
    return hoursWorked/100;
}

function wagesEarnedOnDate(date){
    
    let hoursWorked = hoursWorkedOnDate.call(this, date);

    let payRate = this.payPerHour;
    let wagesOwed = 0;

    if (hoursWorked > 0){
        wagesOwed = payRate * hoursWorked;
    }

    return wagesOwed;
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(recordsArray){
    
    let employeeSum = 0;
    let totalEmployeeSum = 0;

    for (const employee of recordsArray){
        employeeSum = allWagesFor.call(employee);
        totalEmployeeSum = employeeSum + totalEmployeeSum;
    }

    return totalEmployeeSum;
}

function findEmployeeByFirstName(records, name){

    for (const employee of records){
        if (employee.firstName === name){
            return employee;
        }
    }
    return
}