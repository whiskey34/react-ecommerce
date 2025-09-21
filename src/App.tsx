import { useEffect } from 'react'
import Navbar from './component/navbar'
import Footer from './component/footer'
import Home from './pages/Home'
import Product from './pages/Product' 
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ProductDetail from './pages/product/ProductDetail'
import Cart from './pages/cart/Cart'
import PaymentSuccess from './pages/payment/PaymentSuccess'
import PaymentFailed from './pages/payment/PaymentFailed'


import ProtectedRoute from "./pages/routes/ProtectedRoutes";
import { useCartStore, loadCartForUser } from "./pages/stores/cartStores";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";

import './App.css'

function App() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadCartForUser(user.uid);
      } else {
        clearCart(); // when logged out → reset cart
      }
    });
    return () => unsub();
  }, [clearCart]);

  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>
          <main>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* user that need to do login */}
              <Route path="/cart" element={ <ProtectedRoute><Cart /></ProtectedRoute> } />
              <Route path="/success" element={ <ProtectedRoute><PaymentSuccess /></ProtectedRoute> } />
              <Route path="/cancel" element={ <ProtectedRoute><PaymentFailed /></ProtectedRoute> } />
              {/* end of login required */}


            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        
        <div className="">
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
