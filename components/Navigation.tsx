import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
    img: string;
    titles: { [key: string]: string }[];
    categoryId: string;
    language: string;
}

const Navigation: React.FC<NavigationProps> = ({ img, titles, categoryId, language }) => {
    const router = useRouter();

    const imagePath = img ? img.replace(/^.*[\\\/]images[\\\/]/, '/images/') : '';
    
    const handleClick = () => {
        router.push(`/?category_Id=${categoryId}`);
    };

    const titleObj = titles.find((title) => title[language]);
    const titleText = titleObj ? titleObj[language] : 'Название недоступно';

    return (
        <div onClick={handleClick}>
            <div className="flex items-center nav-p gap-[8px] bg-[#F9F9F9] px-[14px] py-[8px] rounded-[50px] cursor-pointer">
                <Image
                    src={imagePath}
                    alt={titleText}
                    width={32}
                    height={32}
                    className="object-cover rounded-full w-[32px] h-[32px]"
                />
                <p className="text-[14px]">{titleText}</p>
            </div>
        </div>
    );
};

export default Navigation;
