CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT(25) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('AA Batteries', 'Electronics', 4.99, 125);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Tent', 'Outdoor', 125, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Blue Jeans', 'Clothing', 79, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('T-Shirt', 'Clothing', 12.49, 130);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Pan', 'Kitchen', 30, 75);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Hammock', 'Outdoor', 37.99, 22);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Cookie Sheet', 'Kitchen', 8.99, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Television', 'Electronics', 1200, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Laptop', 'Electronics', 2000, 175);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Belt', 'Clothing', 25, 160);