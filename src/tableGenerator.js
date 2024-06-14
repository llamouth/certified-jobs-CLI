import Table from "cli-table";
import chalk from "chalk";

const tableGenerator = () => {
    let table = new Table({
        chars: {
             'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
        }
    });
    table.push([chalk.blueBright("Id"), chalk.blueBright("Company"), chalk.blueBright("Position"), chalk.blueBright("Salary"), chalk.blueBright("Earliest Interview")]);
    return table
}



export {tableGenerator}