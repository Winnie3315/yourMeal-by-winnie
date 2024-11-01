"use client"

import React, { useState } from 'react';

const AdminLogin: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const savedFirstName = 'AdminFirstName';
    const savedLastName = 'AdminLastName';
    const savedPassword = 'AdminPassword';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (firstName === savedFirstName && lastName === savedLastName && password === savedPassword) {
            alert('Успешный вход!');
        } else {
            setErrorMessage('Неправильные имя, фамилия или пароль.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                
                {errorMessage && (
                    <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Имя</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Фамилия</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
