const inquirer = require('inquirer');
const fs = require('fs');
let team = [];

class teammate {
    constructor(memberName, memberUsername, memberGiturl, memberEmail, memberRole){
        this.memberName = memberName;
        this.memberUsername = memberUsername;
        this.memberGiturl = memberGiturl;
        this.memberEmail = memberEmail;
        this.memberRole = memberRole;
    }
    
    toHTML(){
        return `<div class="card g-2">
        <h5 class="card-header">${this.memberName}\r\n${this.memberRole}</h5>
        <div class="card-body">
          <p class="card-text">E-Mail</p><a href="${this.memberEmail}">${this.memberEmail}</a>
          <p class="card-text">GitHub:</p><a href="${this.memberGiturl}">${this.memberUsername}</a>
        </div>
      </div>\r\n`;
    }
}

const generatehtml = (team) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <title>Template</title>
</head>
<body class="container">
    <h1 class="display-2 text-center text-dark">
        My Team
    </h1>
    
    <div class="d-inline-flex row">
        ${team}
    </div>
</body>
</html>`



const teammateAdd = () => inquirer
.prompt([
    {   
        name:'memberName',
        type:'prompt',
        message: 'What is the name of this teammember?',
    },
    {
        name: 'memberUsername',
        type: 'prompt',
        message: 'What is the Github username of this member?'
    },
    {
        name: 'memberGiturl',
        type: 'prompt',
        message: 'What is the url to the Github of this user?'
    },
    {
        name: 'memberEmail',
        type: 'prompt',
        message: 'What is the email of this member?'
    },
    {
        name: 'memberRole',
        type: 'list',
        message: 'What is this members role?',
        choices: ['Intern', 'Manager', 'Engineer'],

    }
]).then((data)=> {

    console.log(data)
    team.push(new teammate (data.memberName, data.memberUsername, data.memberGiturl, data.memberEmail, data.memberRole))

    let result = "";
    team.forEach(element => {
        result += element.toHTML(); 
     })
    fs.writeFileSync(`index.html`, generatehtml(result))

    inquirer.prompt([
        {
            name: 'answer',
            type: 'confirm',
            message:'Do you want to add another teammate?'
        }
    ]).then(c =>{
        if (c.answer === true){
            teammateAdd();
        }
    }).catch(err => console.error)  

}).catch(err => console.error) 

teammateAdd();