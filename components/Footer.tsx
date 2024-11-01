import React from 'react';

interface FooterProps {
    translate: any
}

const Footer: React.FC<FooterProps> = ( {translate} ) => {
    return (
        <footer className="w-[1200px] max-1200:w-[900px] max-992:w-[700px] max-768:w-[500px] flex justify-between items-center h-[300px] mt-[100px]">
            <div className="left">
                <img src="/images/biglogo.svg" alt="logo" />
            </div>
            <div className="right flex justify-around w-[50%]">
                <div className="left justify-center items-center flex flex-col">
                    <p className="text-[24px] font-[400]">{translate.footer.callNumber}</p>
                    <a className="text-[16px] font-[400]" href="tel:+79308333811">+7(930)833-38-11</a>
                </div>
                <div className="right justify-center items-center flex flex-col">
                    <p className="text-[24px] font-[400]">{translate.footer.socialNetworks}</p>
                    <div className="soc-seti flex gap-[16px]">
                        <a
                            href="https://www.instagram.com/w1nn14ka_1?igsh=MWF0c3g0Yjg4Zng1NQ=="
                            className="w-[36px] h-[36px]"
                        >
                            <img
                                src="/images/instagramlogo.svg"
                                alt="insta"
                                className="w-[36px] h-[36px]"
                            />
                        </a>
                        <a
                            href="https://t.me/yourMeal_by_Winnie"
                            target="_blank"
                            className="w-[36px] h-[36px]">
                            <img
                                src="/images/telegramlogo.svg"
                                alt="telega"
                                className="w-[36px] h-[36px]"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;