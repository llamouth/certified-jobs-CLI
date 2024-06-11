const { nanoid } = require("nanoid")
const inform = console.log;

// shows all the jobs
const index = (jobs) => {
    return jobs.map(job => `${job.jobId}: ${job.companyName}`)
}

// create a job object
const create = (jobs, jobName, salary, earliestInterview) => {
    const job = {
        jobId: nanoid(4),
        companyName: jobName,
        salary: `$${salary}`,
        earliestInterview: earliestInterview || "TBD"
    }
    jobs.push(job)
    return jobs;
}

// show a specefic job
const show = (jobs, jobName) => {
    const job = jobs.find(job => job.companyName === jobName)
    return `${job.companyName} \nSalary: ${job.salary} \nEarliest interview: ${job.earliestInterview}`
}


const destroy = (jobs, jobName) => {
    const index = jobs.findIndex(job => job.companyName === jobName)
    if (index !== -1) {
        jobs.splice(index, 1);
        inform("Job successfully deleted", jobs)
    }else {
        inform("Job not found", jobs)
    }
    return jobs
}

const edit = (jobs, jobName, editSection, editedValue) => {
    const index = jobs.findIndex((job) => job.companyName === jobName)
    if(index !== -1) {
        switch(editSection) {
            case "id": 
                jobs[index].jobId = editedValue
                break;
            case "name":
                jobs[index].companyName = editedValue
                break;
            case "salary":
                jobs[index].salary = editedValue
                break;
            case "interview":
                jobs[index].earliestInterview = editedValue
                break;
        }
        inform("Job successfully updated")
        return jobs
    }else {
        inform("Job unsuccessfully updated")
    }
}

const save = (jobs,savedJobs, jobName) => {
    const savedJob = jobs.find(job => job.companyName === jobName);
    savedJobs.push(savedJob)
    return savedJobs
}

module.exports = { index, create, show, destroy, edit, save }