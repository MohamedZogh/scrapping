#!/usr/bin/env node

require = require('esm')(module);
const inquirer = require('inquirer');
const { exec } = require("child_process");
const open = require('open');

exec("node scrapRedit.js", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    const result = eval(stdout)
    const choiceList = []
    for(var el in result) {
        const obj = {
            name: result[el].title,
            value: result[el].link,
        }
        choiceList.push(obj)
    }
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'link',
                pageSize: 15,
                message: 'Quel article vous intéresse ?',
                choices: choiceList
            }
        ])
        .then(answers => {
            open(answers.link)
        })
        .catch(error => {
            console.log(error);
        });
});
