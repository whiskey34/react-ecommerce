import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../pages/stores/cartStores';

import { auth } from "../firebase/firebaseConfig";


import '../App.css'

interface Product {
  id: number;
  badge?: string;
  category: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  oldPrice: number;
  currentPrice: number;
  discount: number;
  image: string;
}

function DiscountSection({ product }: { product: Product }) {

    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => setIsWishlisted(!isWishlisted);

    const addItem = useCartStore(state => state.addItem);

    const navigate = useNavigate();
    
    const handleAddToCart = () => {
        const user = auth.currentUser; 

        if (!user) {
        toast.error("Please login to add items to cart", {
            duration: 2000,
            position: "top-center",
        });
        navigate("/login"); // redirect if not logged in
        return;
        }

        addItem({
        id: product.id,
        name: product.title,
        price: product.currentPrice,
        image: product.image,
        quantity: 1,
        });

        toast.success(`${product.title} added to cart!`, {
        duration: 2000,
        position: "top-center",
        });
    };



  return (
    <>
        
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                src="https://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg"
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                />

                {/* Badge */}
                {product.badge && (
                <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider">
                    {product.badge}
                </div>
                )}

                {/* Wishlist Button */}
                <button
                onClick={toggleWishlist}
                className={`absolute top-4 right-4 bg-white bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-colors duration-200 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
                    ${isWishlisted ? "text-pink-600" : "text-gray-500 hover:text-pink-600"}`}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                </button>
            </div>

            {/* Product Details */}
            <div className="p-6">
                {/* Category */}
                <div className="text-cyan-600 text-sm font-semibold uppercase tracking-wide mb-2">
                    {product.category}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
                {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={i < product.rating ? "currentColor" : "none"}
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">
                    {product.reviews} reviews
                </span>
                </div>


                {/* Price & CTA */}
                <div className="mt-8 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
                    <div>
                        {product.oldPrice && (
                        <div className="text-gray-400 line-through text-sm mb-1">
                            ${product.oldPrice.toFixed(2)}
                        </div>
                        )}
                        <div className="flex items-center">
                        <div className="text-2xl font-extrabold text-gray-900">
                            ${product.currentPrice.toFixed(2)}
                        </div>
                        {product.discount && (
                            <div className="ml-3 px-2 py-1 bg-pink-100 text-pink-700 rounded-md font-semibold text-sm">
                            -{product.discount}%
                            </div>
                        )}
                        </div>
                    </div>

                    <button type='button' onClick={handleAddToCart} className="w-full lg:w-auto bg-black text-white px-6 py-3 rounded font-semibold text-base shadow-lg shadow-indigo-100 transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center ">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                        <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                    </button>
                    
                    <Toaster/>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default DiscountSection