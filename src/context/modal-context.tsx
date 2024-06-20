import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal } from 'antd';
import { Order } from '../types';
import ModalTitle from '../components/modal-title/modal-title';
import OrderDetails from '../components/order-details/order-details';


interface ModalContextProps {
    openModal: (data: Order) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<Order | null>(null);

    const openModal = (data: Order) => {
        setModalData(data);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalData(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Modal open={isOpen} onCancel={closeModal} onOk={closeModal} title={<ModalTitle data={modalData} />} centered={true} width={1500} afterClose={() => setModalData(null)} >
                {modalData && <OrderDetails data={modalData} />}
            </Modal>
        </ModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
