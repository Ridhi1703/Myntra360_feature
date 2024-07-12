'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductViewer from '@/components/ProductViewer';

interface Product {
  _id: string;
  name: string;
  material: string;
  modelUrl: string;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${params.id}`);
        setProduct(res.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl mb-4">Material: {product.material}</p>
      <div className="w-full h-96">
        <ProductViewer modelUrl={product.modelUrl} />
      </div>
    </div>
  );
}