import Image from "next/image";
import Navigation from "@/components/Navigation";
import Product from "@/components/Product";
import Modal from "@/components/hoc/Modal";

export default function Home() {
    return (
        <div className="w-full">
            <h1 className="text-[40px] font-[600]">Бургеры</h1>
            <div className="product-cont grid gap-[30px]">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    );
}
