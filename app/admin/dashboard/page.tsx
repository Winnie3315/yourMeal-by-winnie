"use client"
import TotalCard from "@/components/TotalCard";
import { FaListAlt, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div className="wrapper">
            <div className="dashboard flex justify-between items-center">
                <h1 className='text-[50px] text-[#ff7020] font-[600]'>Dashboard</h1>
            </div>
            <div className="product-cont-admin grid gap-[30px] mt-5">
                <TotalCard
                    title="Total Menus"
                    fetchUrl="/api/menu"
                    icon={<FaUtensils />}
                    positiveChange={true}
                />
                <TotalCard
                    title="Total Categories"
                    fetchUrl="/api/category"
                    icon={<FaListAlt />}
                    positiveChange={true}
                />
                <TotalCard
                    title="Total Orders"
                    fetchUrl="/api/menu"
                    icon={<FaShoppingCart />}
                    positiveChange={false}
                />
                <TotalCard
                    title="Total Customers"
                    fetchUrl="/api/menu"
                    icon={<FaUsers />}
                    positiveChange={true}
                />
            </div>
        </div>
    );
}
