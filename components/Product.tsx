import Image from 'next/image';

const Product = () => {
  return (
    <div className="max-w-xs rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="relative h-48 w-full">
        <Image
          src="/app/images/productd"
          alt="Nachos"
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4 text-center">
        <p className="text-xl font-semibold">250₽</p>
        <p className="text-gray-600">Начос</p>
        <p className="text-gray-400">220г</p>
        <button className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-md">
          Добавить
        </button>
      </div>
    </div>
  );
};

export default Product;
