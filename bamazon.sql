DROP DATABASE IF EXISTS bamazon_db;
create database bamazon_db;
use bamazon_db;

create table products(
    
    item_id integer auto_increment,
    product_name varchar(200) not null,
	department_name varchar(200) not null,
    price decimal(10,4) not null,
    stock_quantity integer,
    primary key (item_id)
);


insert into products (product_name, department_name, price, stock_quantity)
values ('Hawthorn Berry Bar', 'food', 1.99, 40),
('Rose Cake', 'food', 3.99, 50),
('Rainbow Dumpling', 'food', 0.99, 100),
('Egg Stewed In Tea','food', 1.49, 30),
('Cheese Fish','food', 5.99, 25),
('Fruit Slice','food', 2.99, 80),
('Casual Sweatshirt','clothing', 9.99, 68),
('Yoga Pants', 'clothing', 11.99, 45),
('Long Cardigan','clothing', 8.99, 30),
('Curvy Bootcut Jeans','clothing', 14.99, 56);

create table departments(
    department_id integer auto_increment,
    department_name varchar(200) not null,
    primary key (department_id)
);

insert into departments (department_name)
values ('food'),
('clothing');