"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const Modal_Form = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/menu/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Image upload failed");
        return null;
      }

      const data = await response.json();
      setMessage("Image uploaded successfully");
      setImageUrl(data.imageUrl);
      return data.imageUrl;
    } catch (error) {
      setMessage("Something went wrong: " + error);
      return null;
    }
  };

  const onSubmit = async (formData) => {
    if (!imageUrl) {
      const uploadedImageUrl = await handleImageUpload();
      if (!uploadedImageUrl) {
        return;
      }
    }

    const completeData = {
      ...formData,
      image: imageUrl,
    };

    try {
      const res = await fetch('http://localhost:3000/api/menu', {
        method: "POST",
        body: JSON.stringify(completeData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const responseData = await res.json();
        setMessage(responseData.message || "Data submission failed");
        return;
      }

      const responseData = await res.json();
      setMessage("Data submitted successfully");
      console.log(responseData);
      onClose();
      reset();
    } catch (error) {
      setMessage('Ошибка при отправке данных: ' + error);
    }
  };

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
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Modal_Form;

// "use client";
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import { useForm } from 'react-hook-form';

// const Modal_Form = ({ isOpen, onClose }) => {
//   const { register, handleSubmit, reset } = useForm();
//   const router = useRouter();

//   async function onSubmit(formData) {
//     console.log(formData);
//     reset();

//     try {
//       const res = await fetch('http://localhost:3000/api/menu', {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const responseData = await res.json();
//       console.log(responseData);
//       onClose();
//     } catch (error) {
//       console.error('Ошибка при отправке данных:', error);
//     }
//   }

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 p-6 relative">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Добавить в меню</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Изображение"
//             {...register('image')}
//           />
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Название"
//             {...register('title')}
//           />
//           <input
//             type="number"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Вес"
//             {...register('weight')}
//           />
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Цена"
//             {...register('price')}
//           />
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Состав"
//             {...register('composition')}
//           ></textarea>
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Описание"
//             {...register('description')}
//           ></textarea>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Добавить
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal_Form;