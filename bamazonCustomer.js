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
    if(err){
        throw err;
    }

    
});

connection.query("SELECT * FROM products",function(err,res){
    if(err){
        throw err;
    }
    console.log(res);
    

// console.log('response');
})  

askCustomer();

function askCustomer(){
    inquirer.prompt([
        {
        name: 'productId',
        type: 'number',
        message:'Product ID, please.',
        validate:function(value){
            if(isNaN(value)===false && value >= 1 && value <=10){
                return true;
            }
            return false;
        }
        },
       {
        name:'count',
        type:'number',
        message:'how many do you want?',
        validate:function(value){
            if(isNaN(value) === false){
                return true;
            }
            return false;
        }
        }
    ])
    .then(function(answer){
        var buyId = answer.productId;
        var buyCount = answer.count;
        connection.query("SELECT * FROM products",function(err,res){
            if(err){
                throw err;
            }else if(buyCount > res[buyId-1].stock_quantity){
                console.log('Insufficient quantity!');
                connection.end();
            }else{
                var quantity = res[buyId-1].stock_quantity - buyCount;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                    stock_quantity: quantity
                    },{item_id: buyId}],
                    function(err){
                        if(err){
                            throw err;
                        }

                        var totalCost = res[buyId-1].price * buyCount; 
                        console.log('Your total cost is $' + totalCost);
                        connection.end();
                    }
        
                )}
            // console.log(res);
           // connection.end();
        });
    });
};

 