import React from 'react';
import Nav from "@/components/Nav";
import Link from 'next/link';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

interface HeaderProps {
    translate: any
    lang: any
}

const Header: React.FC<HeaderProps> = ({ translate, lang }) => {
    console.log("header:" + translate);

    return (
        <header className="w-full ">
            <div className="header-wrapper flex items-center justify-around flex-col">
                <div className="head flex justify-center items-center relative">
                    <div className="top flex-1 text-center">
                        <Link href="/">
                            <img src="/images/minilogo.svg" alt="logo" />
                        </Link>
                    </div>
                    <div className="user absolute right-[-300%]">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>

                <div className="center flex gap-6">
                    <img src="/images/burger.png" alt="burger" />
                    <div className="txt flex flex-col">
                        <h1 className=" text-white font-[800] text-[44px] w-[430px]">{translate.header.title}<span className="text-[#FF7020]">{translate.header.orangeTitle}</span></h1>
                        <p className="text-white text-[16px] pt-10">{translate.header.subtitle}</p>
                    </div>

                </div>
            </div>
            <Nav language={lang} />
        </header>
    );
};

export default Header;