import React from 'react';
import { Spin } from 'antd';

interface ILoader {
    isLoading: boolean;
}

const LoaderWithBg: React.FC<ILoader> = ({ isLoading }) => {
    return (
        <>
            <Spin spinning={isLoading} className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white" />
        </>
    );
};

export default LoaderWithBg;