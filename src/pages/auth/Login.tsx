import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

// import { doc, getDoc } from "firebase/firestore";
// import { useCartStore } from '../../pages/stores/cartStores';

import '../../App.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;

        const toastId = toast.loading("Logging in...");

        try {
        await signInWithEmailAndPassword(auth, email, password);

        toast.success("Login successful!", { id: toastId });

        navigate("/");
        } catch (error) {
        toast.error((error as Error).message, { id: toastId });
        }
    };

    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
        <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
            <h2 className="font-mono text-2xl font-bold text-gray-800 dark:text-white mb-1 text-center">Welcome Shoppers</h2>
            <h2 className="font-mono text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Log in to your account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col">
                <label
                    htmlFor="usernameEmail"
                    className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id="usernameEmail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                <label
                    htmlFor="passWord"
                    className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="passWord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                />
                </div>

                {/* Submit */}
                <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2.5 rounded-lg font-semibold font-mono transition-colors 
                ${
                    isFormValid
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                >
                Log In
                </button>
            </form>

            {/* Extra Links */}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-cyan-600 hover:underline dark:text-cyan-400">
                Sign up
                </Link>
            </p>
        </div>

     
    </div>
  )
}

export default Login
