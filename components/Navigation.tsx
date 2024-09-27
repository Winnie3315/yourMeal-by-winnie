import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  img: string;
  title: string;
  categoryId: string;
}

const Navigation: React.FC<NavigationProps> = ({ img, title, categoryId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/?category_Id=${categoryId}`);
  };

  return (
    <div onClick={handleClick}>
      <div className="flex items-center nav-p gap-[8px] bg-[#F9F9F9] px-[14px] py-[8px] rounded-[50px] cursor-pointer">
        <Image
          src={img}
          alt={title}
          width={32}
          height={32}
          className="object-cover rounded-full w-[32px] h-[32px]"
        />
        <p className="text-[14px]">{title}</p>
      </div>
    </div>
  );
};

export default Navigation;
