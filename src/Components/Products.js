
  import React from 'react';
import { Card } from 'react-bootstrap';

function ProductCard({ product }) {
    const products = [
        { id: 1, name: "GeForce RTX 3080", price: 699, quantity: 20, type: "Video Graphic Cards" },
        { id: 2, name: "Samsung Odyssey G9", price: 1499, quantity: 10, type: "Monitors" },
        { id: 3, name: "Sony WH-1000XM4", price: 349, quantity: 30, type: "Headphones" },
        { id: 4, name: "Apple MacBook Pro 16-inch", price: 2399, quantity: 5, type: "Laptops" },
        { id: 5, name: "Corsair Vengeance LPX 16GB", price: 79, quantity: 50, type: "Computer Memories" },
        { id: 6, name: "ASUS ROG Strix B550-F Gaming", price: 179, quantity: 15, type: "Motherboards" },
        { id: 7, name: "AMD Ryzen 7 5800X", price: 449, quantity: 12, type: "CPU" },
        { id: 8, name: "EVGA SuperNOVA 750 G5", price: 129, quantity: 25, type: "PSU" },
        { id: 9, name: "GeForce RTX 3090", price: 1499, quantity: 10, type: "Video Graphic Cards" },
        { id: 10, name: "Dell Ultrasharp U2415", price: 399, quantity: 8, type: "Monitors" },
        { id: 11, name: "Bose QuietComfort 35 II", price: 299, quantity: 20, type: "Headphones" },
        { id: 12, name: "Microsoft Surface Laptop 4", price: 999, quantity: 7, type: "Laptops" },
        { id: 13, name: "G.Skill Trident Z RGB 32GB", price: 199, quantity: 40, type: "Computer Memories" },
        { id: 14, name: "MSI MPG B550 Gaming Edge", price: 189, quantity: 12, type: "Motherboards" },
        { id: 15, name: "Intel Core i9-10900K", price: 499, quantity: 9, type: "CPU" },
        { id: 16, name: "Seasonic Focus GX-850", price: 159, quantity: 18, type: "PSU" }
      ];

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Price: ${product.price}<br />
          Quantity: {product.quantity}
        </Card.Text>
      </Card.Body>

      <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </Card>

    
  );
}

export default ProductCard;