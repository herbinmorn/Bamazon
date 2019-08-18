var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'517283730',
    database:'bamazon_db'
});

connection.connect(function(err){
    if(err) throw err;
});

veiwDepartment(connection);

function veiwDepartment(connection){
    inquirer.prompt({
       name:'view',
       type:'list',
       message:'what would you like to do?',
       choices:['View Product Sales by Department','Create New Department'] 
    })
    .then(function(ans){
       if (ans.view ==='View Product Sales by Department'){
           saleSummary(connection);
       }
       else if(ans.view ==='Create New Department'){
           newDepartment(connection);
       }
    });
}

function saleSummary(connection)
{
    console.log("Here is your summary by department:");

    try{
        connection.query("SELECT departments.department_id, departments.department_name,products.product_sales FROM departments LEFT JOIN (SELECT department_name, SUM(product_sales) as product_sales FROM products GROUP BY department_name) products ON departments.department_name = products.department_name",
        function(err, res)
        {
            if(err) throw err;

            res.forEach(function(item, index){
                console.log(item);
            });
        });
    }
    finally
    {
        connection.end();
    }
}

function newDepartment(connection)
{
    inquirer.prompt([
        {
            name: 'newDepName',
            type: 'string',
            message:'Name for new department?',
            validate:function(value){
                return true;
            }
        }
    ])
    .then(function(input)
    {
        var newDepName = input.newDepName;
        try{
            connection.query("INSERT INTO departments (department_name) VALUES ('"+newDepName+"')",
            function(err, res){
                if(err) throw err;
                
                console.log("Successfully add new department "+newDepName);
            });
        }
        finally
        {
            connection.end();
        }
    });
}
