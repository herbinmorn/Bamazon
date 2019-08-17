var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'Zxq@820121',
    database:'bamazon_db'
});

connection.connect(function(err){
    if(err) throw err;
    veiwDepartment();
});

function veiwDepartment(){
    inquirer.prompt({
       name:'view',
       type:'list',
       message:'what would you like to do?',
       choices:['View Product Sales by Department','Create New Department'] 
    })
    .then(function(ans){
       if (ans.view ==='View Product Sales by Department'){
           saleSummary();
       }
       else if(ans.view ==='Create New Department'){
           newDepartment();
       }
    });
}

function saleSummary(){
    connection.query("SELECT * FROM products",function(err,res){
        if(err) throw err;
        console.table();
    });
 
}


function newDepartment(){

}