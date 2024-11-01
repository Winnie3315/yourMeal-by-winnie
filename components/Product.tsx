import Image from 'next/image';
import Modal from './hoc/Modal';
import React, { useState } from 'react';

interface Title {
    [key: string]: string;
}

interface Description {
    [key: string]: string;
}

interface ProductProps {
    img: any;
    price: any
    titles?: any;
    weight: any;
    language?: string;
    description?: any;
}

const Product: React.FC<ProductProps> = ({ img, price, titles = [], weight, language = "ru", description = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const imagePath = img ? img.replace(/^.*[\\\/]images[\\\/]/, '/images/') : '';

    const titleObj = titles.length > 0 ? titles.find((title: any) => title[language]) : null;
    const titleText = titleObj ? titleObj[language] : 'Название недоступно';

    const descriptionObj = description.length > 0 ? description.find((desc: any) => desc[language]) : null;
    const descriptionText = descriptionObj ? descriptionObj[language] : 'Описание недоступно';

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={titleText}
            price={price}
            weight={weight}
            img={imagePath}
            description={descriptionText}
        >
            <div className=" product max-w-xs rounded-lg shadow-lg border border-gray-200 p-4 max-992:p-1">
                <div className="relative h-48 max-992:w-[137px] max-992:h-[120px] w-full">
                    {imagePath && (
                        <Image
                            src={imagePath}
                            alt={titleText}
                            fill
                            className="object-cover rounded-t-lg z-[-10] "
                        />
                    )}
                </div>
                <div className="p-4 text-left max-992:p-1">
                    <p className="text-xl max-992:text-[16px] font-semibold">{price}</p>
                    <p className="text-gray-600">{titleText}</p>
                    <p className="text-gray-400">{weight}г</p>
                    <button className="mt-3 w-full max-992:w-[120px] max-992:h-[30px] bg-gray-100 text-gray-700 py-2 rounded-md" onClick={() => setIsOpen(true)}>
                        Добавить
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Product;
