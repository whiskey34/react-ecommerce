import { useState } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useCartStore } from '../stores/cartStores';


import '../../App.css'



function ProductCard() {
    const { state } = useLocation();
    const { id } = useParams<{ id: string }>();
    const [count, setCount] = useState(1);
    
    const product = state?.product;
    console.log("product Id:", id);
    // console.log("product:", product);
    // useEffect(() => {
    //     fetch(`https://fakestoreapi.com/products/${id}`)
    //     .then((res) => res.json())
    //     .then((data) => setProduct(data))
    //     .catch((err) => console.error("Error fetching product:", err));
    // }, [id]);

    const addItem = useCartStore(state => state.addItem);

    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 1) setCount(count - 1); // prevent going below 1
    };

    // if (!product && id) {
    //     product = products.find((p) => p.id === parseInt(id));
    // }

    if (!product) {
        return <p className="p-10 text-center">Product not found !!..</p>;
    }
    

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
            <div className="bg-white rounded-lg  p-4 flex items-center justify-center">
                <Carousel infiniteLoop={false} autoPlay={false} showThumbs={true} showStatus={false} showArrows={true} interval={0} className="w-full">
                    <div className="h-96 flex items-center justify-center bg-gray-50">
                        <img src={product.image} alt={product.title} className="h-full  object-contain" />
                       
                    </div>
                    <div className="h-96 flex items-center justify-center bg-gray-50">
                        <img src={product.image} alt={product.title} className="h-full  object-contain" />
                       
                    </div>
                </Carousel>
            </div>
            <div className="bg-white rounded-lg p-6 flex flex-col justify-start">
                <h3 className="font-bold text-3xl mb-2 font-mono">{product.title}</h3>
                <p className="text-2xl font-semibold text-cyan-700 mb-4">$ {product.currentPrice}</p>
                <p className="font-medium mb-2">Description</p>
                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center gap-3 my-4">
                    <button
                        onClick={decrement}
                        disabled={count < 2}
                        className={`text-lg font-bold transition-colors ${
                        count < 2
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black hover:text-cyan-200"
                        }`}>
                        <i className="fa-solid fa-circle-minus"></i>
                    </button>

                    
                    <span className="min-w-[40px] text-center text-lg font-semibold">
                        {count}
                    </span>

                    <button
                        onClick={increment}
                        className=" text-lg font-bold text-black hover:text-cyan-200">

                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                </div>

                <button type='button' onClick={() => addItem({ id: product.id, name: product.title, price: product.currentPrice, image: product.image, quantity: count, })} className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold font-mono py-3 px-6 rounded-lg shadow-md transition-all duration-200">
                    Add to Cart
                </button>
            </div>
            
        </div>
        
    </>
  )
}

export default ProductCard