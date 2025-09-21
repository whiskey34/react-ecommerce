// import { useState } from 'react'

// import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { useCartStore } from "../stores/cartStores";

import '../../App.css'



function PaymentSuccess() {
    
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        // Clear cart as soon as user lands here
        clearCart();
    }, [clearCart]);

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
                <div className="text-center">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-700">
                        <svg className="h-12 w-12 text-green-600 dark:text-green-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 font-mono">Payment Successful!</h1>
                    <p className="mt-4 text-lg text-gray-800 dark:text-gray-300 font-mono">
                        Thank you for your purchase.
                    </p>
                    <p className="mt-6 text-xl text-blue-600 dark:text-blue-400">
                        Your order will be processed shortly.
                    </p>
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-400 font-mono">
                        If you have any questions or need further assistance, feel free to contact our
                        <a href="github.com/whiskey34" className="font-medium font-mono ms-1 text-indigo-600 dark:text-indigo-400 underline">
                            Customer Services.
                        </a>
                    </p>
                </div>
                <div className="mt-8 text-center">
                    <a href="/"
                        className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-black to-gray-600 hover:scale-105 hover:from-black hover:to-gray-700 dark:from-black dark:to-gray-500 dark:hover:from-black dark:hover:to-gray-600">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default PaymentSuccess