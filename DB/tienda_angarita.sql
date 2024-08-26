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

CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
    comment_text VARCHAR(300),
    user_id INT,
    product_id INT,
    comment_type BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


select * from products

