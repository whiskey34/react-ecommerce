// import { useState } from 'react'
import ProductCard from '../component/productCard'
import '../App.css'

const products = [
        {
            id: 1,
            badge: "New",
            category: "Audio",
            title: "Wireless Headphones",
            rating: 4,
            reviews: 120,
            description:
            "High-quality wireless headphones with noise cancellation and long battery life.",
            features: [
            { icon: "M5 13l4 4L19 7", text: "COD" },
            { icon: "M5 13l4 4L19 7", text: "Gratis" },
            ],
            oldPrice: 199.99,
            currentPrice: 80000,
            discount: 25,
            image:
            "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
        },
        {
            id: 2,
            badge: "",
            category: "Laptop",
            title: "Gaming Laptop Pro 15",
            rating: 5,
            reviews: 200,
            description:
            "Powerful gaming laptop with RTX graphics, 16GB RAM, and a fast Ryzen processor.",
            features: [
            { icon: "M5 13l4 4L19 7", text: "Warranty" },
            { icon: "M5 13l4 4L19 7", text: "Free Shipping" },
            ],
            oldPrice: 1299.99,
            currentPrice: 25000,
            discount: 12,
            image: "https://images.pexels.com/photos/33125275/pexels-photo-33125275.jpeg",
        },
        {
            id: 3,
            badge: "Sale",
            category: "Smartphone",
            title: "Iphone 14 Pro",
            rating: 4,
            reviews: 340,
            description:
            "Latest smartphone with OLED display, triple cameras, and 5G support.",
            features: [
            { icon: "M5 13l4 4L19 7", text: "COD" },
            { icon: "M5 13l4 4L19 7", text: "Installments" },
            ],
            oldPrice: 899.99,
            currentPrice: 530000,
            discount: 20,
            image: "https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg",
        },
        {
            id: 4,
            badge: "",
            category: "Watch",
            title: "Apple Smartwatch",
            rating: 5,
            reviews: 85,
            description:
            "Premium smartwatch with fitness tracking, GPS, and stylish design.",
            features: [
            { icon: "M5 13l4 4L19 7", text: "Fast Delivery" },
            { icon: "M5 13l4 4L19 7", text: "Warranty" },
            ],
            oldPrice: 499.99,
            currentPrice: 62200,
            discount: 20,
            image: "https://images.pexels.com/photos/3646165/pexels-photo-3646165.jpeg",
        },
        {
            id: 5,
            badge: "",
            category: "Camera",
            title: "DSLR Camera Pro",
            rating: 5,
            reviews: 150,
            description:
            "Professional DSLR camera with 24MP resolution and 4K video recording.",
            features: [
            { icon: "M5 13l4 4L19 7", text: "Free Bag" },
            { icon: "M5 13l4 4L19 7", text: "1 Year Warranty" },
            ],
            oldPrice: 1499.99,
            currentPrice: 50000,
            discount: 20,
            image: "https://images.pexels.com/photos/3802602/pexels-photo-3802602.jpeg",
        },
  ];

function Product() {

  return (
    <>
      <div className="py-10 px-5 max-w-[1440px] mx-auto flex flex-wrap justify-center gap-6">
          
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        
      </div>
     
    </>
  )
}

export default Product
