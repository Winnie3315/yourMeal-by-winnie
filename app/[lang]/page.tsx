"use client";

import { Menu } from "@/modules/menu";
import { useEffect, useState, useMemo } from "react";
import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";

interface Title {
    ru?: string;
    en?: string;
}

interface Category {
    _id: string;
    titles: Title[];
}

export default function Home({ params }: { params: { lang: string } }) {
    const [menuItems, setMenuItems] = useState<Menu[]>([]);
    const [categoryItems, setCategoryItems] = useState<Category[]>([]);
    const searchParams = useSearchParams();
    const category_Id = searchParams.get("category_Id");
    const { lang } = params;

    const fetchMenuItems = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/menu");
            if (!res.ok) throw new Error("Ошибка при получении данных");

            const response = await res.json();
            setMenuItems(response.data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const fetchCategoryItems = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/category");
            if (!res.ok) throw new Error("Ошибка при получении данных");

            const response = await res.json();
            setCategoryItems(response.data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const filteredMenuItems = useMemo(() => {
        if (category_Id) {
            console.log("Filtering by category ID:", category_Id);
            return menuItems.filter((item) => {
                if (item.categoryId === undefined) {
                    console.warn("Item without categoryId:", item);
                    return false;
                }
                console.log("item.categoryId:", item.categoryId);
                return item.categoryId.toString() === category_Id;
            });
        }
        return menuItems;
    }, [category_Id, menuItems]);

    const categoryTitle = useMemo(() => {
        const category = categoryItems.find((cat) => cat._id === category_Id);
        if (category) {
            const titleObj = category.titles.find((title) => title[lang as keyof Title]);
            return titleObj ? titleObj[lang as keyof Title] : "Название недоступно";
        }
        return null;
    }, [category_Id, categoryItems, lang]);

    useEffect(() => {
        fetchCategoryItems();
        fetchMenuItems();
    }, []);

    useEffect(() => {
        console.log("Menu items:", menuItems);
    }, [menuItems]);

    const title = categoryTitle
        ? categoryTitle || "Название недоступно"
        : "Новинки";

    return (
        <div className="w-full">
            <h1 className="text-[40px] font-[600]">{title}</h1>

            <div className="product-cont max-992:w-[700px] grid gap-[30px]">
                {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item, index) => (
                        <Product
                            key={index}
                            img={item.images || item.imageUrl}
                            price={item.price}
                            weight={item.weight}
                            titles={item.titles}
                            language={lang}
                            description={item.description}
                        />
                    ))
                ) : (
                    <p>Нет товаров для данной категории</p>
                )}
            </div>
        </div>
    );
}
