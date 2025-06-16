import { getProducts } from "./lib/api";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import NavBar from './components/NavBar';
import Image from 'next/image';

export const dynamic = 'force-static';
export const revalidate = 600;

export default async function Home() {
  try {
    const products = await getProducts();

    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="mt-[180px]">
          {/* Main Slider Image */}
          <div className="w-full flex justify-center bg-white">
            <div className="w-full max-w-7xl px-2 md:px-6">
              <Image
                src="/Header.jpg"
                alt="Main Slider"
                width={1920}
                height={600}
                className="w-full h-auto rounded-2xl mt-2"
                priority
              />
            </div>
          </div>
          
          <main className="flex-grow">
            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto px-4 py-12">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">MORE VALUE DEALS</h2>
                <div className="border-b-2 border-gray-800 w-full mx-auto"></div>
              </div>

              {!products?.length ? (
                <p className="text-center text-red-500">No products available</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          </main>

          <Footer />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return (
      <div className="min-h-screen p-8 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error Loading Content</h1>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }
}
