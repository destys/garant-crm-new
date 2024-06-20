import { Spin } from 'antd';

interface ILoader {
    isLoading: boolean;
    className?: string;
}

const Loader: React.FC<ILoader> = ({ isLoading, className }) => {
    return (
        <div className={`flex justify-center mt-4 ${className}`}>
            <Spin spinning={isLoading} />
        </div>
    );
};

export default Loader;