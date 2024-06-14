# Jortal

Jortal is a command-line interface application designed to help you manage job recommendations. It allows you to create, view, update, delete, and save job listings with ease.

## Features

- **View all jobs**: List all available job listings.
- **Create a new job**: Add a new job to the listings.
- **Show a specific job**: Display details of a specific job.
- **Update a job**: Modify details of an existing job.
- **Delete a job**: Remove a job from the listings.
- **Manage saved jobs**: Save, view, and manage your favorite job listings.

## Installation

To install and run Jortal, you need to have [Node.js](https://nodejs.org/) installed on your machine. Follow the steps below to get started:

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd certified-jobs-cli
2. Install the dependencies: 
    ```sh 
    npm install
    ```
## Usage
After installing the dependencies, you can start the CLI application by running: 
```sh
    npm run start
```
## Commands 
When you start the application, you will be prompted with serveral options: 
1. ***Index all jobs***: Display a list of all job listings.
2. ***Create a new job***: Add a new job listing by providing details like company name, position, salary, and earliest interview date.
3. ***Show a job***: Show details of a specific job by providing the company name.
4. ***Destroy a job***: Remove a job listing by providing the company name.
5. ***Update a job***: Update details of a job listing by specifying the company name, section to edit, and the new value.
6. ***Saved jobs***: Access and manage saved job listings.
7. ***Exit***: Exit the application.

## Example Workflow

1. #### Index all jobs

```sh
What would you like to do?
> index all jobs
```

2. #### Create a new Job
```sh
What would you like to do?
> create a new job

What is the name of the company you would like to add?
> Example Corp

What is the position within the company?
> Software Engineer

What is the salary for the position?
> 100000 (priceInCents)

When is the earliest interview available?
> xx/xx/xxxx <-- Format
```
3. #### Show a job
```sh
What would you like to do?
> show a job

What is the name of the company you would like to show?
> Example Corp
```
4. #### Update a job
```sh
What would you like to do?
> update a job

What is the name of the company you would like to update?
> Example Corp

What is the name of the section you would like to edit?
> salary

What is the new value?
> 80000 (priceInCents)
```
5. #### Destroy a job
```sh
What would you like to do?
> destroy a job

What is the name of the company you would like to destroy?
> Example Corp
```
6. #### Manage saved jobs
```sh
What would you like to do?
> saved jobs

What would you like to access in the save section?
> index all saved jobs
```
## Project Structure

- **index.js**: Main script to run the CLI application.
- **src/helpers.js**: Helper functions for reading/writing JSON files and formatting data.
- **src/jobsController.js**: Contains functions for creating, viewing, updating, and deleting job listings.
- **src/tableGenerator.js**: Generates a table for displaying job listings.
- **data/jobs.json**: JSON file containing job listings.
- **data/savedjobs.json**: JSON file containing saved job listings.
- **package.json**: Project metadata and dependencies.
## Dependencies

- **chalk**: Terminal string styling.
- **cli-table**: Pretty unicode tables for the CLI.
- **figlet**: Creates ASCII art from text.
- **inquirer**: Interactive command-line prompts.
- **nanoid**: Unique ID generator.
- **nanospinner**: Elegant terminal spinners.

## Development Dependencies

- **faker**: Generates fake data for testing.
- **jest**: JavaScript testing framework.
