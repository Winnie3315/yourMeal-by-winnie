import Image from 'next/image';
import { useState } from 'react';

interface AdminProductProps {
    id: string;
    img: string;
    price: number;
    titles: any;
    weight: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedProduct: any) => void;
}

const AdminProduct: React.FC<AdminProductProps> = ({
    id,
    img,
    price,
    titles,
    weight,
    onDelete,
    onUpdate,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const initialTitleRu = Array.isArray(titles) ? titles.find((t) => t.ru)?.ru || '' : titles.ru || '';
    const initialTitleEn = Array.isArray(titles) ? titles.find((t) => t.en)?.en || '' : titles.en || '';

    const [updatedTitleRu, setUpdatedTitleRu] = useState(initialTitleRu);
    const [updatedTitleEn, setUpdatedTitleEn] = useState(initialTitleEn);
    const [updatedPrice, setUpdatedPrice] = useState<number>(price);
    const [updatedWeight, setUpdatedWeight] = useState<string>(weight);

    const imagePath = img.replace(/^.*[\\\/]images[\\\/]/, '/images/');

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titles: [{ ru: updatedTitleRu }, { en: updatedTitleEn }],
                    price: updatedPrice,
                    weight: updatedWeight,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении продукта');
            }

            const data = await response.json();
            if (data.success) {
                onUpdate(id, data.data);
                setIsEditing(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert('Ошибка: ' + error.message);
            } else {
                alert('Ошибка: ' + String(error));
            }
        }
    };

    const handleDelete = () => {
        if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
            onDelete(id);
        }
    };

    return (
        <div className="max-w-xs rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="relative h-48 w-full">
                <Image
                    src={imagePath}
                    alt={updatedTitleRu}
                    fill
                    className="object-cover rounded-t-lg z-[-10]"
                />
            </div>
            <div className="p-4 text-left">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={updatedTitleRu}
                            onChange={(e) => setUpdatedTitleRu(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                            placeholder="Название (RU)"
                        />
                        <input
                            type="text"
                            value={updatedTitleEn}
                            onChange={(e) => setUpdatedTitleEn(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                            placeholder="Название (EN)"
                        />
                        <input
                            type="number"
                            value={updatedPrice}
                            onChange={(e) => setUpdatedPrice(Number(e.target.value))}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                            placeholder="Цена"
                        />
                        <input
                            type="number"
                            value={updatedWeight}
                            onChange={(e) => setUpdatedWeight(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                            placeholder="Вес (г)"
                        />
                        <button onClick={handleUpdate} className="mt-3 w-full bg-blue-700 text-white py-2 rounded-md">
                            Сохранить
                        </button>
                        <button onClick={() => setIsEditing(false)} className="mt-3 w-full bg-gray-300 text-gray-700 py-2 rounded-md">
                            Отменить
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-xl font-semibold">{price} ₽</p>
                        <p className="text-gray-600">{updatedTitleRu}</p>
                        <p className="text-gray-400">{weight} г</p>
                        <div className="btns flex gap-2">
                            <button onClick={handleDelete} className="mt-3 w-full bg-red-700 text-white py-2 rounded-md">
                                Удалить
                            </button>
                            <button onClick={() => setIsEditing(true)} className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-md">
                                Изменить
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProduct;
