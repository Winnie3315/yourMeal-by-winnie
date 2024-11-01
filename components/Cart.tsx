import React from 'react';
import CartCard from './CartCard';

interface CartProps {
    translate: any
}

const Cart: React.FC<CartProps> = ( {translate} ) => {
    return (
        <div className="cart mt-[60px] max-992:hidden w-[300px] p-[20px] border border-gray-200 rounded-xl mr-[30px] h-[447px]">
        <div className="top flex justify-between pb-[10px]">
            <h2 className="text-[24px]">{translate.cart.cart}</h2>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg"><span>1</span>
            </div>
        </div>
        <div className="cart-cont flex overflow-auto h-[240px] flex-col">
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
        </div>
        <div className="result">
            <div className="top flex justify-between pb-[24px]">
                <h3 className="text-[16px]">{translate.cart.overal}</h3>
                <h3 className="text-[16px] font-[400]"><span>1200</span></h3>
            </div>
            <button className="bg-[#FF7020] w-full h-[40px] text-white rounded-xl ">{translate.cart.order}</button>
        </div>
    </div>
    );
};

export default Cart;