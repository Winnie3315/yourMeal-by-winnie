"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const Modal_Form = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  async function onSubmit(formData) {
    console.log(formData);
    reset();

    try {
      const res = await fetch('http://localhost:3000/api/menu', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await res.json();
      console.log(responseData);
      onClose();
      router.push('/');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Добавить в меню</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Изображение"
            {...register('image')}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Название"
            {...register('title')}
          />
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Вес"
            {...register('weight')}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Цена"
            {...register('price')}
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Состав"
            {...register('composition')}
          ></textarea>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Описание"
            {...register('description')}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal_Form;
