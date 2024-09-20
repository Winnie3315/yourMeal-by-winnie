'use client'
import Image from 'next/image';
import { useState } from 'react';

type CartCardProps = {
//   name: string;
//   weight: string;
//   price: number;
//   imageUrl: string;
};
//{ name, weight, price, imageUrl }

const CartCard: React.FC<CartCardProps> = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="border-t  border-blue-300  flex items-center gap-4 ">
      <div className="w-24 h-24 relative">
        <Image src='/images/Rectangle 2.jpg' alt='cartItem' layout="fill" objectFit="contain" className="rounded-lg object-contain" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold">бургер</h3>
        <span className="text-sm text-gray-500">500</span>
        <span className="text-xl font-bold">600₽</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
        <button
          onClick={decreaseQuantity}
          className="text-lg font-semibold px-2"
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="text-lg font-semibold px-2"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartCard;
