const fs = require('fs');
const readline = require("readline");
const add = require("./add");
const update = require("./update");
const del = require("./delete");

let argsToPass = {};
let messageCounter = 1;
const rl = readline.createInterface(process.stdin, process.stdout);
const commandArguments = process.argv.slice(2);
switch (commandArguments[0]) {
    case "update":
    case "add":
        console.log("\nPlease provide the following information:\n     \u2502");
        rl.question("     \u251C\u2501 Description: ", function(answer) {
            if (!answer) {
                answer = "";
            }
            argsToPass.name = answer;
            rl.setPrompt("     \u251C\u2501 Due: ");
            rl.prompt();
            rl.on("line", function(info) {
                if (messageCounter === 1) {
                    if (info) {
                        argsToPass.due = info;
                    }
                    rl.setPrompt("     \u251C\u2501 Done (Y/N): ");
                    rl.prompt();
                }
                else if (messageCounter === 2) {
                    if(info.toLowerCase().trim() === "y") {
                        argsToPass.done = 1;
                    }
                    else {
                        argsToPass.done = 0;
                    }
                    if (commandArguments[0] === "add") {
                        rl.setPrompt("     \u2514\u2501 Status Id (1 = Not Started, 2 = In Progress, 3 = Completed): ");
                    }
                    else {
                        rl.setPrompt("     \u251C\u2501 Status Id (1 = Not Started, 2 = In Progress, 3 = Completed): ");
                    }
                    rl.prompt();
                }
                else if (messageCounter === 3) {
                    if (info === "2" || info === "3") {
                        argsToPass.statusId = parseInt(info);
                    }
                    else {
                        argsToPass.statusId = 1;
                    }
                    if (commandArguments[0] === "add") {
                        rl.close();
                        add(argsToPass);
                    }
                    else {
                        rl.setPrompt("     \u2514\u2501 Id: ");
                        rl.prompt();
                    }
                }
                else {
                    if (isNaN(parseInt(info))) {
                        rl.setPrompt("     \u2514\u2501 Please enter a valid Id: ");
                        rl.prompt();
                    }
                    else {
                        rl.close();
                        update(parseInt(info), argsToPass);
                    }
                }
                messageCounter++;
            });
        });
        break;
    case "delete":
        rl.question("\nPlease provide the Id: ", function(answer) {
            if (isNaN(parseInt(answer))) {
                rl.setPrompt("Please enter a valid Id: ");
                rl.prompt();
                rl.on("line", function(info) {
                    if (isNaN(parseInt(info))) {
                        rl.prompt();
                    }
                    else {
                        rl.close();
                        del(parseInt(info));
                    }
                });
            }
            else {
                rl.close();
                del(parseInt(answer));
            }
        });
        break;
    case "help":
    case undefined:
    default:
            console.log(fs.readFileSync("help.txt", "utf8"));
}