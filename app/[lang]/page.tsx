// "use client";

// import { useEffect, useState } from "react";
// import { Menu } from "@/modules/menu";
// import { Category } from "@/modules/category";
// import Product from "@/components/Product";
// import { useSearchParams, useRouter } from "next/navigation"; 

// export default function Home() {
//   const [menuItems, setMenuItems] = useState<Menu[]>([]);
//   const [categoryItems, setCategoryItems] = useState<Category[]>([]);
//   const searchParams = useSearchParams();
//   const category_Id = searchParams.get("category_Id");

//   const fetchMenuItems = async (categoryId?: string) => {
//     try {
//       const url = categoryId
//         ? `http://localhost:3000/api/menu?category_Id=${categoryId}`
//         : "http://localhost:3000/api/menu";

//       console.log("Fetching menu items with URL:", url);

//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Ошибка при получении данных");

//       const response = await res.json();
//       console.log("Filtered Menu Items:", response.data);
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   };

//   const fetchCategoryItems = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/category");
//       if (!res.ok) throw new Error("Ошибка при получении данных");

//       const response = await res.json();
//       setCategoryItems(response.data);
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryItems();
//     fetchMenuItems();
//   }, []);

//   useEffect(() => {
//     if (category_Id) {
//       console.log("Category ID from query params:", category_Id);
//       fetchMenuItems(category_Id); 
//     }
//   }, [category_Id]);

//   return (
//     <div className="w-full">
//       <h1 className="text-[40px] font-[600]">Бургеры</h1>

//       <div className="product-cont grid gap-[30px]">
//         {menuItems.map((item, index) => (
//           <Product
//             key={index}
//             img={item.image}
//             price={item.price}
//             weight={item.weight}
//             title={item.title}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/modules/menu";
import { Category } from "@/modules/category";
import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<Menu[]>([]);
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  const category_Id = searchParams.get("category_Id");

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

  useEffect(() => {
    if (category_Id) {
      console.log("Filtering by category ID:", category_Id);
      const filteredItems = menuItems.filter(
        (item) => item.category_Id === category_Id
      );
      setFilteredMenuItems(filteredItems);
    } else {
      setFilteredMenuItems(menuItems);
    }
  }, [category_Id, menuItems]);

  useEffect(() => {
    fetchCategoryItems();
    fetchMenuItems();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-[40px] font-[600]">Бургеры</h1>

      <div className="product-cont grid gap-[30px]">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item, index) => (
            <Product
              key={index}
              img={item.image}
              price={item.price}
              weight={item.weight}
              title={item.title}
            />
          ))
        ) : (
          <p>Нет товаров для данной категории</p>
        )}
      </div>
    </div>
  );
}
