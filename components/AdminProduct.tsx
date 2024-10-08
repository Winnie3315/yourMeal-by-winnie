import Image from 'next/image';
import Modal from './hoc/Modal';

const AdminProduct = ({img, price, title, weight}) => {
  return (
    <div className="max-w-xs rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="relative h-48 w-full">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover rounded-t-lg z-[-10]"
        />
      </div>
      <div className="p-4 text-left">
        <p className="text-xl font-semibold">{price}</p>
        <p className="text-gray-600">{title}</p>
        <p className="text-gray-400">{weight}г</p>
        <div className="btns flex gap-2">
            <button className="mt-3 w-full bg-red-700 text-white py-2 rounded-md">
                Удалить
            </button> 
            <button className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-md">
                Изменить
            </button> 
        </div>

      </div>
    </div>
  );
};

export default AdminProduct;
