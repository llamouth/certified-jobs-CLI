import { nanoid } from "nanoid";
const inform = console.log;
import Table from "cli-table";
import chalk from "chalk";

let table = new Table({
    chars: {
         'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
    }
});
table.push([chalk.red("Id"), chalk.red("Company"), chalk.red("Position"), chalk.red("Salary"), chalk.red("Earliest Interview")]);

// shows all the jobs
const index = (jobs) => {
    jobs.map(job => table.push([job.jobId, job.companyName, job.position, job.salary, job.earliestInterview]));
    return table.toString();
}

// create a job object
const create = (jobs, jobName, position, salary, earliestInterview) => {
    const job = {
        jobId: nanoid(4),
        companyName: `${jobName[0].toUpperCase()}${jobName.slice(1)}`,
        position: `${position[0].toUpperCase()}${position.slice(1)}`, 
        salary,
        earliestInterview: earliestInterview || "TBD"
    }
    jobs.push(job)
    return jobs;
}

// show a specefic job
const show = (jobs, jobName) => {
    const job = jobs.find(job => job.companyName === jobName)
    return `${job.companyName} \nPosition: ${job.position} \nSalary: ${job.salary} \nEarliest interview: ${job.earliestInterview}`
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
            case "position":
                jobs[index].position = editedValue
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

export { index, create, show, destroy, edit, save };