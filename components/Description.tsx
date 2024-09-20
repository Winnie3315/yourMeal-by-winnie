import React, { useState } from 'react';

interface DescriptionProps {
    
}

const Description: React.FC<DescriptionProps> = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <div>
            <h1 className='text-[40px] font-[600]'>Мясная бомба</h1>
            <div className="desc-cont flex gap-4">
                <img src="/images/modalImage.jpg" alt="modal" className='object-contain rounded-md w-[50%]' />
                <div className="box">
                    <div className="top">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid sunt excepturi quaerat beatae eius eum quidem nam.</p>
                    </div>
                    <div className="center">
                        <h4>sostav</h4>
                    </div>
                    <div className="bottom">
                        <h5>520g</h5>
                    </div>
                </div>
            </div>
            <div className="description-buy flex justify-between mt-[40px] items-center">
                <div className="left flex gap-2">
                    <button className='w-[230px] rounded-xl bg-[#FF7020] text-white'>Добавить</button>
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                        <button
                        onClick={decreaseQuantity}
                        className="text-lg font-semibold px-2"
                        disabled={quantity === 1}
                        >
                        -
                        </button>
                        <span className="text-lg">{quantity}</span>
                        <button
                        onClick={increaseQuantity}
                        className="text-lg font-semibold px-2"
                        >
                        +
                        </button>
                    </div>
                    
                </div>
                <div className="right">
                    <h2 className='font-[600] '>650</h2>
                </div>

            </div>
        </div>
    );
};

export default Description;