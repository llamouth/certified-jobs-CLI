import { nanoid } from "nanoid";
import { formatToUSD, formatToProperString} from "./helpers.js";
import { tableGenerator } from "./tableGenerator.js";
import { createSpinner } from "nanospinner";
const inform = console.log;

const handleSpin = (bool) => { 
    const spin = createSpinner("Awaiting for completion...").start()
    if(bool) {
        spin.success({text: "Success"})
    }else {
        spin.error({text: "Error Try again"})
    }
}

// shows all the jobs
const index = (jobs) => {
    const table = tableGenerator()
    for(const key in jobs) {
        const employeeJobsArr = jobs[key]
        employeeJobsArr.map(job => table.push([job.jobId, job.employee, job.companyName, job.position, job.salary, job.earliestInterview]))
    }
    return table.toString();
}

// create a job object
const create = (jobs, employee, company, position, salary, earliestInterview) => {
    const employeePresent = jobs[employee]
    if(employeePresent) {
        jobs[employee].push({
            jobId: nanoid(4),
            employee: formatToProperString(employee),
            companyName: formatToProperString(company),
            position: formatToProperString(position), 
            salary: formatToUSD(salary),
            earliestInterview: earliestInterview || "TBD"
        })
    } else { 
        jobs[employee] = [ 
            {
                jobId: nanoid(4),
                employee,
                companyName: formatToProperString(company),
                position: formatToProperString(position), 
                salary: formatToUSD(salary),
                earliestInterview: earliestInterview || "TBD"
            }
        ]
    
    }
    handleSpin(true)
    inform(index(jobs))
    return jobs;
}

// show a specefic job
const show = (jobs, employee) => {
    const table = tableGenerator()
    const employeeArr = jobs[employee]
    employeeArr.map(job => table.push([job.jobId, job.employee, job.companyName, job.position, job.salary, job.earliestInterview]))
    return table.toString()
}

const destroy = (jobs, employee, company, data) => {
    if(!data[1]){
        delete jobs[employee]
    }else {
        const employeeArr = jobs[employee]
        const jobIndex = employeeArr.findIndex(job => job.companyName.toLowerCase() === company.toLowerCase())
        employeeArr.splice(jobIndex, 1)
    }
    inform(index(jobs))
    return jobs
}

const edit = (jobs, employee, company, section, value) => {
    const jobIndex = jobs[employee].findIndex((job) => job.companyName.toLowerCase() === company.toLowerCase())
    if(jobIndex !== -1) {
        switch(section) {
            case "id": 
                jobs[employee][jobIndex].jobId = value
                break;
            case "name":
                jobs[employee][jobIndex].companyName = formatToProperString(value)
                break;
            case "position":
                jobs[employee][jobIndex].position = formatToProperString(value)
                break;
            case "salary":
                jobs[employee][jobIndex].salary = formatToUSD(value)
                break;
            case "interview":
                jobs[employee][jobIndex].earliestInterview = value
                break;      
        }
        handleSpin(true)
        inform(index(jobs))
        return jobs
    } else {
        inform("Job unsuccessfully updated")
    }
}

const save = (jobs,savedJobs, employee, company) => {
    const savedJob = jobs[employee].find(job => job.companyName.toLowerCase() === company.toLowerCase());
    if(savedJobs[employee]){
        savedJobs[employee].push(savedJob)
    }else{
        savedJobs[employee] = [savedJob]
    }
    inform(index(savedJobs))
    return savedJobs
}

export { index, create, show, destroy, edit, save };