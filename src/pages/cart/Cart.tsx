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
        const response = await axios.post("http://localhost:5000/api/create-checkout-session", {
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
        <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
            <h1
                className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]"
            >
                My Shopping Cart
            </h1>
            <div className="flex items-start mt-8 gap-6">
                <div className="bg-white p-4 w-[800px] rounded-xl">
                <table className="w-full bg-white rounded-xl">
                    <thead>
                        <tr
                            className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide"
                        >
                            <th className="text-left px-2 py-2">Product</th>
                            <th className="px-2 py-2">price</th>
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
                        ) : ( items.map((item) => (
                            <tr key={item.id} className="text-center">
                                {/* Product */}
                                <td className="px-2 py-2 text-left align-top flex items-center gap-2">
                                {item.image && (
                                    <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-[100px] h-[100px] object-contain"
                                    />
                                )}
                                <span>{item.name}</span>
                                </td>

                                {/* Price */}
                                <td className="px-2 py-2">${item.price.toFixed(2)}</td>

                                {/* Quantity */}
                                <td className="p-1 bg-white rounded-[100px] border border-[#a0a0a0] justify-around items-center flex">
                                <button
                                    onClick={() => updateQty(item.id, item.quantity - 1)}
                                    className="text-gray-600 hover:text-gray-900 text-sm p-1 rounded-full"
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <span className="w-4 text-center text-[#191919] text-sm font-normal leading-normal">
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
                                    width="24"
                                    height="25"
                                    className="cursor-pointer"
                                    onClick={() => removeItem(item.id)}
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
                                    stroke="#CCCCCC"
                                    strokeMiterlimit="10"
                                    />
                                    <path
                                    d="M16 8.5L8 16.5"
                                    stroke="#666666"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                    <path
                                    d="M16 16.5L8 8.5"
                                    stroke="#666666"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        
                        <tr className="border-t border-gray-400">
                            <td className="px-2 py-2 " colSpan={3}>
                                <div className="flex  mt-3">

                                    <Link to={'/product'}
                                        className="px-8 cursor-pointer py-3.5 bg-[#f2f2f2] hover:bg-black hover:text-white rounded-[43px] text-[#4c4c4c] text-sm font-semibold leading-[16px]"
                                    >
                                        Return to shop
                                    </Link>
                                </div>
                            </td>
                            {/* <td className="px-2 py-2" colSpan={2}>
                            <button
                                className="px-8 py-3.5 cursor-pointer bg-[#f2f2f2] hover:bg-cyan-600 hover:text-white rounded-[43px] text-[#4c4c4c] text-sm font-semibold  leading-[16px]"
                            >
                                Update Cart
                            </button>
                            </td> */}
                        </tr>
                    </tfoot>
                </table>
                </div>
                <div className="w-[424px] bg-white rounded-lg p-6">
                <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
                    Cart Total
                </h2>
                <div className="w-[376px] py-3 justify-between items-center flex">
                    <span className="text-[#4c4c4c] text-base font-normal leading-normal"
                    >Total:</span
                    ><span className="text-[#191919] text-base font-semibold leading-tight"
                    >${total.toFixed(2)}</span
                    >
                </div>
                <div
                    className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex"
                >
                    <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]"
                    >Shipping:</span
                    ><span className="text-[#191919] text-sm font-medium leading-[21px]"
                    >Free</span
                    >
                </div>
                <div
                    className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex"
                >
                    <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]"
                    >Subtotal:</span
                    ><span className="text-[#191919] text-sm font-medium leading-[21px]"
                    >${total.toFixed(2)}</span
                    >
                </div>
                <button type='button' onClick={paymentCheckout}
                    className="w-[376px] text-white mt-5 px-10 py-4 bg-[#00b206] hover:bg-green-800 rounded-[44px] gap-4 text-base font-semibold leading-tight"
                >
                    Proceed to checkout
                </button>
                </div>
            </div>
            <div
                className="mt-6 p-5 w-[800px] bg-white rounded-lg border border-[#e6e6e6] justify-start items-center gap-6 inline-flex"
            >
                <h3
                className="text-[#191919] w-1/4 text-xl font-medium classNameName leading-[30px]"
                >
                Coupon Code
                </h3>
                <div className="w-full border border-[#e6e6e6] rounded-[46px] flex overflow-hidden">
                <input
                    placeholder="Enter code"
                    type="text"
                    className="flex-1 px-6 py-3.5 outline-none bg-white rounded-[46px] text-[#999999] text-base font-normal leading-normal"
                /><button
                    className="px-10 py-4 bg-[#333333] hover:bg-gray-600 rounded-[43px] text-white text-base font-semibold leading-tight"
                >
                    Apply Coupon
                </button>
                </div>
            </div>
        </section>
        
    </>
  )
}

export default Cart