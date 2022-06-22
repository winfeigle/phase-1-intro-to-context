// Your code here
const createEmployeeRecord = arr => {
    const employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

const createEmployeeRecords = arrays => {
    const employeeRecords = []
    arrays.forEach(arr => {
        employeeRecords.push(createEmployeeRecord(arr))
    });
    return employeeRecords;
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
    employeeRecord['timeInEvents'].push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })

    return employeeRecord;
}


const createTimeOutEvent = (employeeRecord, dateStamp) => {
    employeeRecord['timeOutEvents'].push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })

    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, dateStamp) => {
    const clockIn = employeeRecord.timeInEvents.find(day => day.date === dateStamp).hour
    const clockOut = employeeRecord.timeOutEvents.find(day => day.date === dateStamp).hour
    let hoursWorked = (clockOut - clockIn)/100
    return hoursWorked;
}

const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
    let rawWage = hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour
    return rawWage;
}

const allWagesFor = employee => {
    let eligableDates = employee.timeInEvents.map(function(e){
        return e.date
    });

    let payable = eligableDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable; 
}

const calculatePayroll = employeeArr => {
    return employeeArr.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}