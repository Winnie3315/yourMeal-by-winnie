import React, { useState } from "react";
import Description from "../Description";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	price: string;
	weight: string;
	img: string;
	children: React.ReactNode;
	description: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, price, weight, img, children, description }) => {
	
	return (
		<>
			{children}

			{isOpen && (
				<div
					className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
					style={{
						background: "rgba(0,0,0,0.5)",
						backdropFilter: "blur(10px)",
					}}
				>
					<div className="w-[500px] h-fit bg-white rounded-md p-4">
						<button onClick={onClose}>x</button>
						<Description title={title} price={price} weight={weight} img={img} description={description} />
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
