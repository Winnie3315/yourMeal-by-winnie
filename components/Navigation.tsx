import React from 'react';

interface NavigationProps {
    
}

const Navigation: React.FC<NavigationProps> = () => {
    return (
        <div>
        <div className="flex items-center gap-[8px] bg-[#fff] px-[14px] py-[8px] rounded-[50px]">
            <img src='/public/images/navigation.svg' alt="nav" className='w-[24px]' />
            <p className='text-[14px]'>title</p>
        </div>

        </div>
    );
};

export default Navigation;