"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  titleRu: string;
  titleEn: string;
  imageUrl?: string;
}

export default function Modal_Category({
  closeModal,
  isOpen,
}: {
  closeModal: () => void;
  isOpen: boolean;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!file) {
      setMessage('Пожалуйста, выберите изображение.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadResponse = await fetch('/api/menu/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        setMessage(errorData.message || 'Ошибка загрузки изображения');
        return;
      }

      const imageData = await uploadResponse.json();

      const categoryData = {
        imageUrl: imageData.data,
        titles: [
          { ru: data.titleRu },
          { en: data.titleEn }
        ]
      };

      const postResponse = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!postResponse.ok) {
        throw new Error('Ошибка при создании категории');
      }

      reset();
      setFile(null);
      setImage(null);
      setMessage('');
      closeModal();
    } catch (error) {
      setMessage('Что-то пошло не так: ' + error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg w-96 shadow-2xl relative">
        <h2 className="text-xl font-bold mb-4">Добавить категорию</h2>
        <form className='z-20' onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('titleRu', { required: 'Название на русском обязательно' })}
            type="text"
            placeholder="Название на русском"
            className={`w-full mb-4 p-2 border rounded ${errors.titleRu ? 'border-red-500' : ''}`}
          />
          {errors.titleRu && <p className="text-red-500">{errors.titleRu.message}</p>}

          <input
            {...register('titleEn', { required: 'Название на английском обязательно' })}
            type="text"
            placeholder="Название на английском"
            className={`w-full mb-4 p-2 border rounded ${errors.titleEn ? 'border-red-500' : ''}`}
          />
          {errors.titleEn && <p className="text-red-500">{errors.titleEn.message}</p>}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mb-4 p-2 border rounded"
          />
          {image && <img src={image} className="w-[200px] h-[200px] mb-4" alt="preview" />}
          {message && <p className="text-red-500">{message}</p>}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Добавить категорию
          </button>
        </form>
        <button onClick={closeModal} className="absolute top-2 right-5 text-gray-600 hover:text-gray-800">
          x
        </button>
      </div>
    </div>
  );
}
