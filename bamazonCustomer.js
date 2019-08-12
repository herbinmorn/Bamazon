var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysqlsql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'Zxq@820121',
    database:'bamazon_db'
});

connection.connect(function(err){
    if(err){
        throw err;
    }

    // console.log('response');
    askCustomer();
});

function askCustomer(){
    inquirer.prompt({
        name: 'productId',
        type: 'number',
        message:'Product ID, please.'
    },
    {
        name:'count',
        type:'number',
        message:'how many do you want?'
    })
};