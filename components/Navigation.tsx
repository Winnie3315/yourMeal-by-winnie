import React from 'react';

interface NavigationProps {
    
}

const Navigation: React.FC<NavigationProps> = () => {
    return (
        <div>
            <div className="flex items-center nav-p gap-[8px] bg-[#F9F9F9] px-[14px] py-[8px] rounded-[50px]">
                <img src='/images/free-icon-cheeseburger-2362255.jpg' alt="nav" className='w-[24px]' />
                <p className='text-[14px] '>Бургеркингговно</p>
            </div>
        </div>
    );
};

export default Navigation;