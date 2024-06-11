const {writeJsonFile, readJsonFile} = require("./src/helpers");
const { create, index, show, destroy, edit, save } = require("./src/jobsController");
const inform = console.log;

const run = () => {
    let writeToFile = false;
    let updatedJobs = []

    const action = process.argv[2]
    const job = process.argv[3];
    const jobs = readJsonFile("./data", "jobs.json");    
    
    switch (action) {
        case "index":
            const jobsView = index(jobs);
            inform(jobsView);
            break;
        case "create":
            const salary = process.argv[4];
            const earliestInterview = process.argv[5];
            updatedJobs = create(jobs, job, salary, earliestInterview);
            writeToFile = true;;
            break;
        case "show": 
            inform(show(jobs, job));
            break;
        case "destroy":
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