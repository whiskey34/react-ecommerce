// import { useState } from 'react'

import { useCartStore } from '../stores/cartStores';

import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../App.css'



function Cart() {
    
    const items = useCartStore(state => state.items);
    const removeItem = useCartStore(state => state.removeItem);

    const updateQty = useCartStore(state => state.updateQty);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const paymentCheckout = async () => {
        try {
        const response = await axios.post("https://bitshop-api.vercel.app/api/create-checkout-session", {
            items,  // [{ name, price, quantity }]
            total,
        });

        if (response.data.url) {
            window.location.href = response.data.url; // Stripe Checkout page
        } else {
            console.error("No Stripe Checkout URL returned:", response.data);
        }
        } catch (error) {
        console.error("Checkout error:", error);
        }
    };

  return (
    <>
        <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-4 sm:px-8">
            <h1 className="text-center text-[#191919] dark:text-white text-2xl sm:text-[32px] font-semibold leading-tight sm:leading-[38px]">
                My Shopping Cart
            </h1>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row items-start mt-8 gap-6">

                {/* Cart items */}
                <div className="bg-white p-4 w-full lg:max-w-[800px] rounded-xl overflow-x-auto">
                <table className="w-full min-w-[500px] bg-white rounded-xl text-sm">
                    <thead>
                    <tr className="text-center border-b border-gray-400 text-[#7f7f7f] font-medium uppercase tracking-wide">
                        <th className="text-left px-2 py-2">Product</th>
                        <th className="px-2 py-2">Price</th>
                        <th className="px-2 py-2">Quantity</th>
                        <th className="px-2 py-2">Subtotal</th>
                        <th className="w-7 px-2 py-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.length === 0 ? (
                        <tr>
                        <td
                            colSpan={5}
                            className="py-6 text-center text-gray-500 italic"
                        >
                            Cart is empty — please choose a product first.
                        </td>
                        </tr>
                    ) : (
                        items.map((item) => (
                        <tr key={item.id} className="text-center">
                            {/* Product */}
                            <td className="px-2 py-2 text-left flex items-center gap-2">
                            {item.image && (
                                <img
                                src={item.image}
                                alt={item.name}
                                className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] object-contain"
                                />
                            )}
                            <span className="text-sm sm:text-base">{item.name}</span>
                            </td>

                            {/* Price */}
                            <td className="px-2 py-2">${item.price.toFixed(2)}</td>

                            {/* Quantity */}
                            <td className="p-1 bg-white rounded-full border border-[#a0a0a0] flex justify-around items-center">
                            <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="text-gray-600 hover:text-gray-900 text-sm p-1 rounded-full"
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="w-4 text-center text-[#191919] text-sm">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="text-gray-600 hover:text-gray-900 text-sm p-1 rounded-full"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            </td>

                            {/* Subtotal */}
                            <td className="px-2 py-2">
                            ${(item.price * item.quantity).toFixed(2)}
                            </td>

                            {/* Remove */}
                            <td className="px-2 py-2">
                            <svg
                                width="20"
                                height="20"
                                className="cursor-pointer"
                                onClick={() => removeItem(item.id)}
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
                                stroke="#CCCCCC"
                                />
                                <path
                                d="M16 8.5L8 16.5M16 16.5L8 8.5"
                                stroke="#666666"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                />
                            </svg>
                            </td>
                        </tr>
                        ))
                    )}
                    </tbody>
                    <tfoot>
                    <tr className="border-t border-gray-400">
                        <td colSpan={3} className="px-2 py-2">
                        <div className="mt-3">
                            <Link
                            to={"/product"}
                            className="px-6 sm:px-8 py-3 bg-[#f2f2f2] hover:bg-black hover:text-white rounded-full text-[#4c4c4c] text-sm font-semibold"
                            >
                            Return to shop
                            </Link>
                        </div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                </div>

                {/* Cart total */}
                <div className="w-full lg:w-[424px] bg-white rounded-lg p-6">
                <h2 className="text-[#191919] mb-2 text-lg sm:text-xl font-medium">
                    Cart Total
                </h2>
                <div className="py-3 flex justify-between">
                    <span className="text-gray-600 text-base">Total:</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="py-3 border-t flex justify-between">
                    <span className="text-gray-600 text-sm">Shipping:</span>
                    <span className="text-sm font-medium">Free</span>
                </div>
                <div className="py-3 border-t flex justify-between">
                    <span className="text-gray-600 text-sm">Subtotal:</span>
                    <span className="text-sm font-medium">${total.toFixed(2)}</span>
                </div>
                <button
                    type="button"
                    onClick={paymentCheckout}
                    className="w-full text-white mt-5 px-6 py-4 bg-[#00b206] hover:bg-green-800 rounded-full text-base font-semibold"
                >
                    Proceed to checkout
                </button>
                </div>
            </div>

            {/* Coupon Code */}
            <div className="mt-6 p-5 w-full lg:max-w-[800px] bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
                <h3 className="text-[#191919] text-lg sm:text-xl font-medium w-full sm:w-1/4">
                Coupon Code
                </h3>
                <div className="flex w-full border border-[#e6e6e6] rounded-full overflow-hidden">
                <input
                    placeholder="Enter code"
                    type="text"
                    className="flex-1 px-4 sm:px-6 py-3 outline-none bg-white text-gray-500 text-base"
                />
                <button className="px-6 sm:px-10 py-3 bg-[#333333] hover:bg-gray-600 text-white font-semibold">
                    Apply
                </button>
                </div>
            </div>
            </section>

        
    </>
  )
}

export default Cart