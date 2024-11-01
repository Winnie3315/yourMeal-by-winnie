import Image from 'next/image';
import { useState } from 'react';

interface CategoryProps {
    id: string;
    img: string;
    titles: { ru: string; en: string };
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedCategory: any) => void;
}

const CategoryAdmin: React.FC<CategoryProps> = ({ id, img, titles, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [updatedTitleRu, setUpdatedTitleRu] = useState(titles.ru);
    const [updatedTitleEn, setUpdatedTitleEn] = useState(titles.en);

    const imagePath = img.replace(/^.*[\\\/]images[\\\/]/, '/images/');

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/category/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titles: [{ ru: updatedTitleRu }, { en: updatedTitleEn }],
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении категории');
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
        if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
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
                        <button onClick={handleUpdate} className="mt-3 w-full bg-blue-700 text-white py-2 rounded-md">
                            Сохранить
                        </button>
                        <button onClick={() => setIsEditing(false)} className="mt-3 w-full bg-gray-300 text-gray-700 py-2 rounded-md">
                            Отменить
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600">{titles.ru}</p>
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

export default CategoryAdmin;
