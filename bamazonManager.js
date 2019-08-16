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
    connection.query("SELECT * FROM products",function(err,res){
        if(err){
            throw err;
        }
        console.log(res); 
        connection.end();    
    })   
}

function lowInventory(){
    console.log('Let us see what is running low:');
    connection.query("SELECT * FROM products",function(err,res){
        if(err){
            throw err;
        }
        for(var i=0; i<res.length; i++){ 
            if(res[i].stock_quantity < 5){
                console.log(res[i].product_name);
            } 
        
        }  
        connection.end();  
    })   
}

function addInventory(){
    inquirer.prompt([{
        name:'addInventory',
        type:'number',
        message:'which product you want to add more? please input the product\'s item_id ',
        validate:function(value){
            if(isNaN(value)===false && value >= 1 && value <=10){
                return true;
            }
            return false;
        }

    },
    {
        name:'addCount',
        type:'number',
        message:'how many do you want to add?',
        validate:function(value){
            if(isNaN(value) === false){
                return true;
            }
            return false;
        }

    }
])
   .then(function(answer){
       var addInventory = answer.addInventory;
       var addCount = answer.addCount;
       
       connection.query("SELECT * FROM products", function(err,res){
           if(err){
               throw err;
           }else {
           var totalCount = addCount + res[addInventory-1].stock_quantity;
           connection.query(
           "UPDATE products SET ? WHERE ?",
           [
               {stock_quantity: totalCount},
               {item_id: addInventory}
           ],
               function(err){
               if(err) throw err;
           }
       );

   }
}); 
 }); 
   //console.log('Let us see what we should get more:');
}

function addNew(){
    inquirer.prompt([{
        name:'name',
        type:'input',
        message:'what is the name of the new product?'

    },{
        name:'department',
        type:'list',
        message:'what department does the new product belong to?',
        choices:['food','clothing']
    },{
        name:'price',
        type:'number',
        message:'what is the unit price?'
    },{
        name:'quantity',
        type:'number',
        message:'how many you want to add?'
    }])
    .then(function(ans){
        connection.query(
            "INSERT INTO products SET ?",
            {product_name: ans.name,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.quantity}
        , function(err){
                if(err) throw err;
            }
        );

    });
    
}

