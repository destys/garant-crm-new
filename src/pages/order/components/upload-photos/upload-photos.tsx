import { Form, Image, Button } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { FileInterface } from '../../../../types';
import Dragger from 'antd/es/upload/Dragger';
import { useUpload } from '../../../../utils/upload-utils';

interface IUploadPhotos {
    orderId: number;
    data: FileInterface[] | null;
}

const UploadPhotos: React.FC<IUploadPhotos> = ({ orderId, data }) => {
    const { files: images, normFile, uploadProps, handleDelete } = useUpload(orderId, data, 'device_photos');
    return (
        <>
            <Form>
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} className="mb-6">
                    <Dragger {...uploadProps} accept="image/*">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетяните файлы для загрузки</p>
                        <p className="ant-upload-hint">Поддерживаются все форматы изображений</p>
                    </Dragger>
                </Form.Item>
            </Form>
            <Image.PreviewGroup
                preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 flex-wrap gap-2">
                    {images.map((image) => (
                        <div key={image.id} className="relative w-full">
                            <Image
                                width={'100%'}
                                height={150}
                                src={`${process.env.REACT_APP_UPLOAD_URL}${image.attributes.url}`}
                                preview={{
                                    src: `${process.env.REACT_APP_UPLOAD_URL}${image.attributes.url}`,
                                }}
                                className="object-cover w-full h-full"
                            />
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                className="absolute top-2 right-2"
                                onClick={() => handleDelete(image.id)}
                            />
                        </div>
                    ))}
                </div>
            </Image.PreviewGroup>
        </>
    );
};

export default UploadPhotos;
