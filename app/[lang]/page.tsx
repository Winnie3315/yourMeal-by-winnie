"use client"

import Image from "next/image";
import Navigation from "@/components/Navigation";
import Product from "@/components/Product";
import Modal from "@/components/hoc/Modal";
import Modal_Form from "@/components/Modal_form";
import { useEffect, useState } from "react";
import { Menu } from "@/modules/menu";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [menuItems, setMenuItems] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/menu');
                if (!res.ok) throw new Error("Ошибка при получении данных");
    
                const response = await res.json();
                console.log("Response from API:", response);
                setMenuItems(response.data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchMenuItems();
    }, [isDataUpdated]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleDataUpdate = () => {
        setIsDataUpdated(prev => !prev);
        closeModal();
    };

    console.log(menuItems);

    return (
        <div className="w-full">
            <h1 className="text-[40px] font-[600]">Бургеры</h1>
            <div className="product-cont grid gap-[30px]">
                <Modal_Form isOpen={isModalOpen} onClose={handleDataUpdate}/>
                {menuItems.map((item, index) => (
                    <Product
                        key={index}
                        img={item.image}
                        price={item.price}
                        weight={item.weight}
                        title={item.title}
                    />
                ))}
                <button onClick={openModal}>add menu</button>
            </div>
        </div>
    );
}
