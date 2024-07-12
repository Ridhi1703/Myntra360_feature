import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/types/product'; // Import the Product interface
import { create3DModel } from '@/lib/create3DModel'; // Import the create3DModel function

export async function POST(request: Request) {
  try {
    const { name, material, imageUrls } = await request.json();
    const modelUrl = await create3DModel(imageUrls);

    const { db } = await connectToDatabase();
    const result = await db.collection('products').insertOne({
      name,
      material,
      imageUrls,
      modelUrl,
    });

    if (result.insertedId) {
      const insertedProduct = await db.collection('products').findOne({ _id: result.insertedId });
      return NextResponse.json(insertedProduct as Product);
    } else {
      throw new Error('Failed to insert product');
    }
  } catch (error) {
    console.error('Error inserting product:', error);
    return NextResponse.error(new Error('Failed to insert product'));
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection('products').find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error(new Error('Failed to fetch products'));
  }
}
