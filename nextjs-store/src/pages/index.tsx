import { useEffect, useState } from 'react';
import { ShoraCloudClient } from '@shoracloud/sdk';

const client = new ShoraCloudClient({
  apiKey: process.env.NEXT_PUBLIC_SHORA_API_KEY || '',
});

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Shora Cloud Store</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
