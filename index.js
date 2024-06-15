#!/usr/bin/env node 

import {writeJsonFile, readJsonFile, formatToUSD} from "./src/helpers.js"
import { index, create, show, destroy, edit, save } from "./src/jobsController.js";
import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";

const inform = console.log;




const run = () => {

    let updatedJobs = []
    let showSaved = false
    const jobs = readJsonFile("./data", "jobs.json"); 
   

    const questionObject = {
        startQuestions: [
            {
            name: "start", 
            type: "list", 
            message: "What would you like to do?",
            choices: [
                "index all",
                "create a new job or new employee",
                "show an employees jobs",
                "destroy a job or an emplooyee",
                "update a job or employee",
                "saved jobs",
                "exit"
            ],
            }
        ],
        createQuestions: [
            {
                name: "decision",
                type: "list",
                message: "Would you like to create an employee or job for employee?",
                choices: [
                    "employee",
                    "job"
                ]
            }
        ],
        employeeCreateQuestions: [
            {
                name: "employee",
                type: "input",
                message: "What is the name of the employee you want to crate?"
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company?"
            },
            {
                name: "position",
                type: "input",
                message: "What is the position within the company?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the position?",
            },
            {
                name: "interview",
                type: "input",
                message: "When is the earliest interview available?",
            }
        ], 
        jobCreateQuestions: [
            {
                name: "employee",
                type: "input",
                message: "What is the name of the employee you want to add a job for?"
            },
            {
                name: "company",
                type: "input",
                message: "What is the name of the company?"
            },
            {
                name: "position",
                type: "input",
                message: "What is the position within the company?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the position?",
            },
            {
                name: "interview",
                type: "input",
                message: "When is the earliest interview available?",
            }
        ],
        showQuestions: [
            {
                name: "showQuestions",
                type: "input",
                message: "What employee yould you like to show?",
            }
        ],
        destroyQuestions: [
            {
                name: "decision",
                type: "list",
                message: "Would you like to delete an employee or a job from an employee?",
                choices: [
                    "employee",
                    "job"
                ]
            }
        ],
        employeeDestroyQuestions: [
            {
                name: "employee",
                type: "input",
                message: "Who is the employee you would like to destroy?"
            }
        ],
        jobDestroyQuestions: [
            {
                name: "employee",
                type: "input",
                message: "What employees data do you want to access?"
            },
            {
                name: "job",
                type: "input",
                message: "What is the companys name you would like to destroy?"
            }
        ],
        updateQuestions: [
            {
                name: "updateQuestions",
                type: "input",
                message: "What is the name of the company you would like to update?"
            },
            {
                name: "editSection",
                type: "input",
                message: "What is the name of the section you would like to edit?"
            },
            {
                name: "editValue",
                type: "input",
                message: "What is the new value?"
            }
        ],
        saveQuestions: [
            {
                name: "saveQuestions",
                type: "list",
                message: "What would you like to access in the save section?",
                choices: [
                    "save a job",
                    "index all saved jobs",
                    "show a saved job",
                    "destroy a saved job",
                    "update a saved job",
                    "back"
                ]
            }
        ],
        saveAJob: [
            {
                name: "saveAJob",
                type: "input",
                message: "Which Job would you like to save?"
            }
        ],
        continueQuestions: [
            {
                name: "continueQuestions",
                type: "list",
                message: "Would you like to do something else?",
                choices: [
                    "Yes",
                    "No"
                ]
            }
        ],
    }

    const { startQuestions, createQuestions, employeeCreateQuestions, jobCreateQuestions, showQuestions, destroyQuestions, employeeDestroyQuestions, jobDestroyQuestions,updateQuestions, saveQuestions, saveAJob, continueQuestions } = questionObject

    const figIt = (text) => {
        inform(chalk.blueBright(
            figlet.textSync(text, {font: "3D-ASCII", horizontalLayout: "fitted", width: "100", whitespaceBreak: true})
        ))
    }

    const runAgain = () => {
        inquirer.prompt(continueQuestions).then(({continueQuestions}) => {
            if(continueQuestions === "Yes") {
                if(showSaved) {
                    runSavedDisplay()
                }else {
                    run()
                }
            }else {
                figIt("Thanks for using Jortal")
            }     
        })
    }  

    const runSavedDisplay = () => {
        inquirer.prompt(saveQuestions).then(({saveQuestions}) => {

            const savedAction = saveQuestions.split(" ")[0];
            const savedJobs = readJsonFile("./data", "savedJobs.json")
            let updatedSavedJobs = []
            
            switch (savedAction) {
                case "index":
                    const jobsView = index(savedJobs);
                    inform(jobsView);
                    runAgain()
                    break;
                case "create":
                    inquirer.prompt(createQuestions).then(({name, position, salary, interview})=> {
                        updatedSavedJobs = create(savedJobs, name, position, formatToUSD(salary), interview)
                        writeJsonFile("./data", "savedjobs.json", updatedSavedJobs)
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case "show":
                    inquirer.prompt(showQuestions).then(({showQuestions}) => {
                        inform(show(savedJobs, showQuestions));
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case "destroy":
                    inquirer.prompt(destroyQuestions).then(({decision, destroy}) => {
                        updatedSavedJobs = destroy(savedJobs, destroyQuestions);
                        writeJsonFile("./data", "savedjobs.json", updatedSavedJobs)
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case "update":
                    inquirer.prompt(updateQuestions).then(({updateQuestions, editSection, editValue}) => {
                        updatedSavedJobs = edit(savedJobs, updateQuestions, editSection, editValue);
                        writeJsonFile("./data", "savedjobs.json", updatedSavedJobs)
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case "save": 
                    inquirer.prompt(saveAJob).then(({saveAJob}) => {
                        updatedSavedJobs =  save(jobs,savedJobs, saveAJob);
                        writeJsonFile("./data", "savedjobs.json", updatedSavedJobs)
                    }).then(() => {
                        runAgain()
                    })
                    break;
                case"back": 
                    run()
                    break;
            }
        })
    }

    const isEmployeeOrJob = (data) => {
        if(data === "employee"){return employeeCreateQuestions}
        if(data === "job"){return jobCreateQuestions}
    }

    const deleteEmployeeOrJob = (data) => {
        if(data === "employee"){return employeeDestroyQuestions}
        if(data === "job"){return jobDestroyQuestions}
    }
 
    figIt("Welcome To Jortal")
    inquirer.prompt(startQuestions).then(({start})=> {
        const action = start.split(" ")[0]
        switch (action) {
            case "index":
                const jobsView = index(jobs);
                inform(jobsView);
                runAgain()
                break;
            case "create":
                inquirer.prompt(createQuestions).then(({decision})=> {
                    const data = isEmployeeOrJob(decision)
                    inquirer.prompt(data).then(({employee, company, position, salary, interview}) => {
                        updatedJobs = create(jobs, employee, company, position, salary, interview)
                        writeJsonFile("./data", "jobs.json", updatedJobs)
                    }).then(() => {
                    runAgain()
                })
                })
                break;
            case "show":
                inquirer.prompt(showQuestions).then(({showQuestions}) => {
                    inform(show(jobs, showQuestions));
                }).then(() => {
                    runAgain()
                })
                break;
            case "destroy":
                inform(index(jobs));
                inquirer.prompt(destroyQuestions).then(({decision}) => {
                    const data = deleteEmployeeOrJob(decision)
                    inquirer.prompt(data).then(({employee, job})=> {
                        updatedJobs = destroy(jobs, employee, job, data);
                        writeJsonFile("./data", "jobs.json", updatedJobs)
                    }).then(() => {
                        runAgain()
                    })
                })
                break;
            case "update":
                inquirer.prompt(updateQuestions).then(({updateQuestions, editSection, editValue}) => {
                    updatedJobs = edit(jobs, updateQuestions, editSection, editValue);
                    writeJsonFile("./data", "jobs.json", updatedJobs)
                }).then(() => {
                    runAgain()
                })
                break;
            case "saved":
                inform(figIt("Current Jobs"),index(jobs))
                runSavedDisplay()
                showSaved = true
                break;   
            case "exit":
                figIt("Thanks for using Jortal")
                break;
        }
    }); 
}

run()