import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth, db  } from "../../firebase/firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { toast } from "react-hot-toast";


export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isFormValid =
    fullName.trim() !== "" &&
    address.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const toastId = toast.loading("Creating account...");
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential)

    // Update displayName
    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    // Save extra info to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      fullName,
      phone,
      address,
      email,
      createdAt: serverTimestamp(),
    });

    toast.success("Account created successfully!", { id: toastId });

    navigate("/login");

  } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message, { id: toastId });
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md my-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold font-mono text-center mb-6">
          Sign Up for an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
            ></textarea>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
            />
          </div>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
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
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
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
            Sign Up
          </button>
        </form>

        {/* Extra Links */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 hover:underline dark:text-cyan-400">
            Log In
            </Link>
        </p>
      </div>
    </div>
  );
}
