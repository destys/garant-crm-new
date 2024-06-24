import { Button, Modal } from "antd";
import { useState } from "react";

const MasterModal = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Создать мастера
            </Button>
            <Modal
                title="20px to Top"
                style={{ top: 20 }}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                centered
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default MasterModal;