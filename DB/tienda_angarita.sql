CREATE DATABASE tienda_angarita;
USE tienda_angarita;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) UNIQUE,
    user_password VARCHAR(300), 
    user_type VARCHAR(10) DEFAULT 'User'
);

insert into users(user_name, user_password, user_type) VALUES ("samuel", "samuel@", "Admin"), ("daniel", "daniel@", "Admin");


CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30),
    product_description VARCHAR (300),
    product_price INT,
    protuct_category ENUM('Electronics', 'Clothings', 'Home Appliances') NOT NULL,
    product_photo LONGBLOB
);
DROP TABLE products;
CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
    comment_text VARCHAR(300),
    user_id INT,
    product_id INT,
    comment_type BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

