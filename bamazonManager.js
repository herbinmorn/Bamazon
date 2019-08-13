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
    listOptions();
});

function listOptions(){
    inquirer.prompt({
        name:'operations',
        type:'list',
        message:'what do you want to do?',
        choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
    })
    .then(function(answer){
        if (answer.operations === 'View Products for Sale'){
            viewProduct();
        }
        else if (answer.operations === 'View Low Inventory'){
            lowInventory();
        }
        else if (answer.operations === 'Add to Inventory'){
            addInventory();
        }
        else if (answer.operations === 'Add New Product'){
            addNew();
        }
        else{
            connection.end();
        }
    });
}

function viewProduct(){
    console.log('Let us see what we have:');
}

function lowInventory(){
    console.log('Let us see what is running low:');
}

function addInventory(){
    console.log('Let us see what we should get more:');
}

function addNew(){
    console.log('Let us see what is new:');
}

