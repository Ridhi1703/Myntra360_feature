// src/components/ProductList.tsx

"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Product } from '@/types/product'; // Adjust the path as per your project structure

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link href={`/products/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
