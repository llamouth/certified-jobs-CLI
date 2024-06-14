import { nanoid } from "nanoid";
import { formatToUSD, formatToProperString } from "./helpers.js";
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
    jobs.map(job => table.push([job.jobId, job.companyName, job.position, job.salary, job.earliestInterview]));
    return table.toString();
}

// create a job object
const create = (jobs, jobName, position, salary, earliestInterview) => {
    const job = {
        jobId: nanoid(4),
        companyName: formatToProperString(jobName),
        position: formatToProperString(position), 
        salary,
        earliestInterview: earliestInterview || "TBD"
    }
    jobs.push(job)
    handleSpin(true)
    inform(index(jobs))
    return jobs;
}

// show a specefic job
const show = (jobs, jobName) => {
    const table = tableGenerator()
    const job = jobs.find(job => job.companyName.toLowerCase().trim() === jobName.toLowerCase().trim())
    table.push([job.jobId ,job.companyName, job.position, job.salary, job.earliestInterview])
    return table.toString()
}

const destroy = (jobs, jobName) => {
    const jobIndex = jobs.findIndex(job => job.companyName.toLowerCase() === jobName.toLowerCase())
    jobs.splice(jobIndex, 1)
    handleSpin(jobIndex !== -1)
    inform(index(jobs))
    return jobs
}

const edit = (jobs, jobName, editSection, editedValue) => {
    const jobIndex = jobs.findIndex((job) => job.companyName.toLowerCase() === jobName.toLowerCase())
    editSection = editSection.toLowerCase()
    if(jobIndex !== -1) {
        switch(editSection) {
            case "id": 
                jobs[jobIndex].jobId = editedValue
                break;
            case "name":
                jobs[jobIndex].companyName = formatToProperString(editedValue)
                break;
            case "position":
                jobs[jobIndex].position = formatToProperString(editedValue)
                break;
            case "salary":
                jobs[jobIndex].salary = formatToUSD(editedValue)
                break;
            case "interview":
                jobs[jobIndex].earliestInterview = editedValue
                break;      
        }
        handleSpin(true)
        inform(index(jobs))
        return jobs
    }else {
        inform("Job unsuccessfully updated")
    }
}

const save = (jobs,savedJobs, jobName) => {
    const savedJob = jobs.find(job => job.companyName.toLowerCase() === jobName.toLowerCase());
    handleSpin(savedJob)
    savedJobs.push(savedJob)
    inform(index(savedJobs))
    return savedJobs
}

export { index, create, show, destroy, edit, save };