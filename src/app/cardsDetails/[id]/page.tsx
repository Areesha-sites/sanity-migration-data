import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
const CardsDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params; 
  // Updated query with additional fields
  const query = `
    *[_type=="product" && _id==$id][0]{
      _id,
      name,
      description,
      tags,
      discountPercentage,
      rating,
      ratingCount,
      quantity,
      price,
      "image_url":image.asset->url
    }
  `;
  try {
    // Fetch product data
    const product = await client.fetch(query, { id });

    if (!product) {
      return notFound(); // Return 404 if product is not found
    }
    return (
      <div className="max-w-3xl mx-auto p-8 bg-slate-100 rounded-lg shadow-lg">
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold text-black mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-black mt-4">
          Price: ${product.price}
        </p>
        <p className="text-lg text-gray-800 mt-2">Quantity: {product.quantity}</p>
        <p className="text-lg text-gray-800 mt-2">Tags: {product.tags?.join(", ")}</p> {/* Display tags if available */}
        <p className="text-lg text-gray-800 mt-2">Discount: {product.discountPercentage}%</p> {/* Display discount if available */}
        <p className="text-lg text-gray-800 mt-2">Rating: {product.rating} ({product.ratingCount} reviews)</p> {/* Display rating and rating count */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound(); // Return 404 if there's an error
  }
};
export default CardsDetails;
