import { Link } from "react-router-dom";


function ShopNow() {
  return (
    <>
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* <!-- Card 1 --> */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <img src="/img/group-1.png" alt="Popular Products" className="h-32 object-contain mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Popular Products</h3>
                    <p className="text-gray-500 text-sm mb-4">
                    iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
                    </p>
                    <Link to="/product" className="px-6 py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
                        Shop Now
                    </Link>
                </div>

                {/* <!-- Card 2 --> */}
                <div className="bg-gray-100 shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <img src="/img/ipad.png" alt="iPad Pro" className="h-32 object-contain mb-4"/>
                    <h3 className="text-lg font-semibold mb-2">iPad Pro</h3>
                    <p className="text-gray-500 text-sm mb-4">
                    iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
                    </p>
                    <Link to="/product" className="px-6 py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
                    Shop Now
                    </Link>
                </div>

                {/* <!-- Card 3 --> */}
                <div className="bg-gray-300 shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <img src="/img/samsung-galaxy.png" alt="Samsung Galaxy" className="h-32 object-contain mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Samsung Galaxy</h3>
                    <p className="text-gray-500 text-sm mb-4">
                    iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
                    </p>
                    <Link to="/product" className="px-6 py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
                    Shop Now
                    </Link>
                </div>

                {/* <!-- Card 4 --> */}
                <div className="bg-[#0A2025] shadow-md rounded-lg p-6 flex flex-col items-center text-center text-white">
                    <img src="/img/macbook-1.png" alt="MacBook Pro" className="h-32 object-contain mb-4" />
                    <h3 className="text-lg font-semibold mb-2">MacBook Pro</h3>
                    <p className="text-gray-300 text-sm mb-4">
                    iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
                    </p>
                    <Link to="/product" className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition">
                    Shop Now
                    </Link>
                </div>

                </div>
            </div>
            </section>

    </>
  );
}

export default ShopNow