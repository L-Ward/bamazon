//Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connected as id " + connection.threadId);
    displayInventory();
}));

//Displaying inventory on app start
function displayInventory() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        for (var i = 0; i < res.length; i++) {
            // console.table(res[i])
            console.log(`${res[i].item_id}  ${res[i].product_name}     Price: ${res[i].price}      Quantity: ${res[i].stock_quantity}`);
        }
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirer.prompt([
        // What item customer wants to buy
        {
            type: 'input',
            name: 'itemPurchased',
            message: 'What is the id number of the item you would like to purchase? \n',
        },
        // Quantity to be purchased
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like? \n',
        }

    ]).then
        (input => {
            console.log(input);
            checkInventory(parseInt(input.itemPurchased), parseInt(input.quantity));
        });
}

function checkInventory(id, quantity) {
    connection.query("SELECT * FROM products WHERE ?",
        {
            item_id: id
        },
        (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            if (res[0].stock_quantity < quantity) {
                console.log('Insufficient quantity')
                displayInventory();
            } else {
                processPurchase(res[0], parseInt(quantity));
            }
        });
}

function processPurchase(item, quantity) {
    var purchaseTotal = quantity * item.price;
    var newQuantity = item.stock_quantity - quantity;

    connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: item.item_id
            }
        ], 
        (err, res) => {
            console.log(`Your total is: $${purchaseTotal}`);
            allDone();
        }
    )
}

function allDone() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'continueShopping',
            message: 'Would you like to purchase anything else? \n',
            choices: ['yes', 'no']
        }
    
    ]).then
        (res => {
            if(res.continueShopping === 'yes'){
                displayInventory();
            } else {
                connection.end();
            }
        });
}