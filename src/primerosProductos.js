// SOLO EJECUTAR UNA VEZ

import { fileURLToPath } from 'url';
import {db} from './app.js';
import { dirname, resolve } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getBlobImage(filePath) {
    return fs.readFileSync(resolve(__dirname, filePath));
}

const images = [
    getBlobImage('images/jacket.jpg'),
    getBlobImage('images/headphones.jpg'),
    getBlobImage('images/smartwatch.jpg'),
    getBlobImage('images/table.jpg'),
    getBlobImage('images/bike.jpg'),
    getBlobImage('images/keyboard.jpg'),
    getBlobImage('images/charger.jpg'),
    getBlobImage('images/watch.jpg'),
    getBlobImage('images/speaker.jpg'),
    getBlobImage('images/bulb.jpg')
];

const insertProducts = async () => {
    try {
        const query = 'INSERT INTO products (product_name, product_description, product_price, product_photo) VALUES (?, ?, ?, ?)';
        await db.query(query, ['Vintage Leather Jacket', 'Stylish leather jacket with a vintage feel.', 120, images[0]]);
        await db.query(query, ['Wireless Headphones', 'High-quality wireless headphones with noise cancellation.', 85, images[1]]);
        await db.query(query, ['Smartwatch Series 5', 'Latest model with fitness tracking and heart rate monitor.', 150, images[2]]);
        await db.query(query, ['Wooden Coffee Table', 'Elegant wooden coffee table with a modern design.', 200, images[3]]);
        await db.query(query, ['Mountain Bike', 'Durable mountain bike perfect for off-road adventures.', 450, images[4]]);
        await db.query(query, ['Gaming Keyboard', 'RGB backlit mechanical keyboard for an immersive gaming experience.', 75, images[5]]);
        await db.query(query, ['Portable Charger', 'High-capacity portable charger with fast charging.', 35, images[6]]);
        await db.query(query, ['Stainless Steel Watch', 'Classic stainless steel watch with a minimalist design.', 100, images[7]]);
        await db.query(query, ['Bluetooth Speaker', 'Compact Bluetooth speaker with powerful sound.', 50, images[8]]);
        await db.query(query, ['Smart LED Bulb', 'Energy-efficient smart LED bulb with adjustable brightness and color.', 20, images[9]]);

        console.log('Products inserted successfully');
    } catch (err) {
        console.error('Error inserting products', err.message);
    }
};

insertProducts();

