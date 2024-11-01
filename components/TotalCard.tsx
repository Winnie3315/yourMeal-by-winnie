import React, { useEffect, useState } from 'react';

interface TotalCardProps {
    title: string;
    fetchUrl: string;
    icon: JSX.Element;
    positiveChange: boolean;
}

const TotalCard: React.FC<TotalCardProps> = ({ title, fetchUrl, icon, positiveChange }) => {
    const [value, setValue] = useState<number | string>(0);
    const [percentage, setPercentage] = useState<number>(0);

    console.log(value);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(fetchUrl);
                const data = await res.json();

                setValue(data.data.length);
                setPercentage(12.5);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [fetchUrl]);

    return (
        <div className=" bg-white shadow-lg border border-gray-200 p-6 rounded-md flex flex-col justify-between">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-4xl font-bold flex items-center gap-2">
                {value}
                <span className={`text-sm ${positiveChange ? 'text-green-500' : 'text-red-500'}`}>
                    {positiveChange ? '↑' : '↓'} {percentage}%
                </span>
            </div>
            <div className="self-end">{icon}</div>
        </div>
    );
};

export default TotalCard;
