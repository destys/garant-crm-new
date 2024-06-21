import { Form, Button } from 'antd';
import { InboxOutlined, DeleteOutlined, FileOutlined, DownloadOutlined } from '@ant-design/icons';
import { FileInterface } from '../../../../types';
import Dragger from 'antd/es/upload/Dragger';
import { useUpload } from '../../../../utils/upload-utils';

interface IUploadDocuments {
    orderId: number;
    data: FileInterface[] | null;
}

const UploadDocuments: React.FC<IUploadDocuments> = ({ orderId, data }) => {
    const { files: documents, normFile, uploadProps, handleDelete } = useUpload(orderId, data, 'order_files', 'order_files');

    return (
        <>
            <Form>
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} className="mb-6">
                    <Dragger {...uploadProps} accept=".pdf,.doc,.docx,.xls,.xlsx,.txt">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетяните файлы для загрузки</p>
                        <p className="ant-upload-hint">Поддерживаются все форматы документов</p>
                    </Dragger>
                </Form.Item>
            </Form>
            <div className="grid grid-cols-3 gap-4">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="relative flex items-center gap-2 p-2 border rounded"
                    >
                        <FileOutlined className="text-2xl" />
                        <span className="ml-2">{doc.attributes.name}</span>
                        <Button
                            href={`${process.env.REACT_APP_UPLOAD_URL}${doc.attributes.url}`}
                            target='_blank'
                            type="default"
                            shape="circle"
                            icon={<DownloadOutlined />}
                            download={doc.attributes.name}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            className="ml-2"
                            onClick={() => handleDelete(doc.id)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default UploadDocuments;
