#!/usr/bin/env node 

import {writeJsonFile, readJsonFile, formatToUSD} from "./src/helpers.js"
import { index, create, show, destroy, edit, save } from "./src/jobsController.js";
import inquirer from "inquirer";

const inform = console.log;

const run = () => {



    let writeToFile = false;
    let updatedJobs = []

    const action = process.argv[2]
    const job = process.argv[3];
    const jobs = readJsonFile("./data", "jobs.json");   
    const salary = formatToUSD(process.argv[5]);
    
    
    switch (action) {
        case "start": 
            const answers = inquirer.prompt({
                name: "start", 
                type: "input", 
                message: "What would you like to do?"
            });
            break;
        case "index":
            if(process.argv[3]){
                const savedJobs = readJsonFile("./data", "savedJobs.json") 
                const savedJobsView = index(savedJobs);
                inform(chalk.blue(savedJobsView));
                break;
            }
            const jobsView = index(jobs);
            inform(jobsView);
            break;
        case "create":
            const position = process.argv[4];
            if(salary === "$NaN") {
                throw "Invalid salary be sure to wrap the name of the company and position around strings\n"
            }
            const earliestInterview = process.argv[6];
            updatedJobs = create(jobs, job, position, salary, earliestInterview);
            writeToFile = true;
            break;
        case "show": 
        if(process.argv[4]){
            const savedJobs = readJsonFile("./data", "savedJobs.json")
            inform(show(savedJobs, job))
            break;
        }
            inform(show(jobs, job));
            break;
        case "destroy":
            if(process.argv[4]){
                const savedJobs = readJsonFile("./data", "savedJobs.json") 
                const newlySavedJobs = destroy(savedJobs, job)
                writeJsonFile("./data", "savedjobs.json", newlySavedJobs)
                break;
            }
            updatedJobs = destroy(jobs, job);
            writeToFile = true;
            break;
        case "update":
            const jobName = process.argv[4];
            const editSection = process.argv[5];
            const editedValue = process.argv[6];
            updatedJobs = edit(jobs, job, jobName, editSection, editedValue);
            writeToFile = true;
            break;
        case "save":
            const savedJobs = readJsonFile("./data", "savedJobs.json")
            const newlySavedJobs = save(jobs,savedJobs, job);
            writeJsonFile("./data", "savedjobs.json", newlySavedJobs)
            break;   
    }

    if (writeToFile) {
        writeJsonFile("./data", "jobs.json", updatedJobs);
        inform(updatedJobs);
    }
}

run()