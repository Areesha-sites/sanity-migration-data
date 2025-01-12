import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
const getProducts = async () => {
  const products = await client.fetch(
    `*[_type=="product"]{
        _id,
        name,
        quantity,
        price,
        "image_url":image.asset->url
      }
    `
  );
  return products;
};
export default async function Cards() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-3 w-full h-auto gap-[20px] px-14 py-9">
      {products.map((item: any) => (
        <Link href={`/cardsDetails/${item._id}`}>
          <div
            key={item._id}
            className="w-full shadow-xl bg-slate-100 border-[1px] p-4"
          >
            <Image
              src={item.image_url}
              alt={item.name}
              height={100}
              width={100}
            />
            <p className="text-black font-bold text-2xl">{item.name}</p>
            <p className="text-black font-semibold text-[15px]">
              Quantity: {item.quantity}
            </p>
            <p>{item.price}</p>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">
              View Details
            </button>
            {/* </Link> */}
          </div>
        </Link>
      ))}
    </div>
  );
}