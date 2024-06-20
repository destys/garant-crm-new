import React from 'react'

interface IOrderHeader {
    title: string;
    /* status: "Новая" | "Согласовать" | "Отправить инженера" | "Проверить" | "Архив" | "Отказ"; */
    status: string;
}



const OrderHeader: React.FC<IOrderHeader> = ({ title, status }) => {
    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Новая":
                return "bg-blue-500";
            case "Согласовать":
                return "bg-yellow-500";
            case "Отправить инженера":
                return "bg-green-500";
            case "Проверить":
                return "bg-orange-500";
            case "Архив":
                return "bg-gray-500";
            case "Отказ":
                return "bg-red-500";
            default:
                return "bg-gray-300";
        }
    };
    return (
        <div className="flex justify-between items-center gap-2">
            <div className="text-sm lg:text-base">{title}</div>
            <div className={`p-1 lg:p-2 bg-black text-xs lg:text-sm text-white rounded ${getStatusColor(status)}`}>{status}</div>
        </div>
    )
}

export default OrderHeader