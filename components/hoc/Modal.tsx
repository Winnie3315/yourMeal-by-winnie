"use client";
import React, { Fragment, useState } from "react";
import Description from "../Description";

interface ModalProps {
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div onClick={() => setIsOpen(true)}>{children}</div>

			{isOpen && (
				<div
					className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
					style={{
						background: "rgba(0,0,0,0.5)",
						backdropFilter: "blur(10px)",
					}}
				>
					<div className="w-[500px] h-fit bg-white rounded-md p-4">
						<button onClick={() => setIsOpen(false)}>x</button>
						<Description />
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;