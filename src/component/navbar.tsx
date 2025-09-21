import { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";

import { useCartStore } from '../pages/stores/cartStores';

import '../App.css'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const items = useCartStore(state => state.items);

    // calculate total quantity
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    // helper to check active menu
    const isActive = (path: string) =>
        location.pathname === path
        ? "text-cyan-700 dark:text-white "
        : "text-gray-700 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-white";
    

  return (
    <>
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <a href="#" className="flex items-center">
                    <img src={reactLogo} className="h-6 mr-3 sm:h-9" alt="Landwind Logo"/>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BitShop</span>
                </a>
                <div className="flex items-center lg:order-2">
                    <div className="hidden mt-2 mr-4 sm:inline-block">
                        <span></span>
                    </div>

                    <Link to="/cart" className="inline-flex items-center me-2 shadow-md text-black font-mono bg-white hover:text-white  hover:bg-cyan-800 focus:ring-4  font-medium rounded-lg text-sm px-3 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800">
                        <i className="fa-solid fa-cart-shopping me-1"></i> {totalQuantity}
                    </Link>
                    

                    {/* <Link to="/login" className="hidden lg:inline-block text-white font-mono bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800">
                        Log in
                    </Link> */}

                    {/* Auth button (Login OR Avatar dropdown) */}
                    {!currentUser ? (
                        <Link
                        to="/login"
                        className="hidden lg:inline-block text-white font-mono bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
                        >
                        Log in
                        </Link>
                    ) : (
                        <div className="relative hidden lg:block">
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="flex items-center focus:outline-none"
                        >
                            <img
                            src={currentUser.photoURL || "/default-avatar.png"}
                            alt="User avatar"
                            className="w-9 h-9 rounded-full border-2 border-cyan-500"
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                            <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                                {currentUser.displayName || currentUser.email}
                            </p>
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Logout
                            </button>
                            </div>
                        )}
                        </div>
                    )}

                    

                    <button data-collapse-toggle="mobile-menu-2" onClick={() => setIsOpen(!isOpen)} type="button"
                        className="inline-flex items-center justify-center w-10 h-10 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded={isOpen}>
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                        <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 
                            1 0 111.414 1.414L11.414 10l4.293 
                            4.293a1 1 0 01-1.414 1.414L10 
                            11.414l-4.293 4.293a1 1 0 
                            01-1.414-1.414L8.586 10 4.293 
                            5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                        </svg>

                        ) : (
                        <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 
                            0 110 2H4a1 1 0 01-1-1zM3 
                            10a1 1 0 011-1h12a1 1 0 
                            110 2H4a1 1 0 01-1-1zM3 
                            15a1 1 0 011-1h12a1 1 0 
                            110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                        </svg>
                        )}
                    </button>
                </div>
                <div className={`${isOpen ? "block" : "hidden"} items-center justify-between w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link to="/"
                                className={`block py-2 pl-3 pr-4 font-mono lg:p-0 ${isActive("/")}`}>Home</Link>
                        </li>
                        <li>
                            <Link to="/product"
                                className={`block py-2 pl-3 pr-4 font-mono lg:p-0 ${isActive("/product")}`}>Products</Link>
                        </li>

                        {/* Mobile-only login button */}
                        <li className="mt-3 lg:hidden">
                            {!currentUser ? (
                                <Link
                                to="/login"
                                className="block py-2 pl-3 pr-4 font-semibold font-mono text-cyan-700 lg:p-0 dark:text-white"
                                >
                                Log In
                                </Link>
                            ) : (
                                <button
                                onClick={handleLogout}
                                className="block py-2 pl-3 pr-4 font-semibold font-mono text-red-600 lg:p-0 dark:text-white"
                                >
                                Logout
                                </button>
                            )}
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar