CREATE DATABASE tienda_angarita;
USE tienda_angarita;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) UNIQUE,
    user_password VARCHAR(300) 
);


CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30),
    product_description VARCHAR (300),
    product_price INT,
    product_photo LONGBLOB
);
drop table products;
select * from products