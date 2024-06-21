import axios from "axios";
import { useEffect, useState } from "react";
import { Client } from "../../../types";
import { Store } from "antd/es/form/interface";
import { Button, Form, FormProps, Input, InputNumber } from "antd";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/auth-context";

interface IClientInfo {
    data: Client
}

const ClientInfo: React.FC<IClientInfo> = ({ data }) => {
    const [initialValues, setInitialValues] = useState<Store | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { userToken } = useAuth();

    useEffect(() => {
        const values = {
            name: data.attributes.name,
            address: data.attributes.address,
            phone: data.attributes.phone,
        };

        setInitialValues(values);
    }, [data]);

    const onFinish: FormProps['onFinish'] = (values) => {
        try {
            setLoading(true);
            axios.put(
                `${process.env.REACT_APP_API_URL}/clients/${data.id}`,
                {
                    data: {
                        id: data.id,
                        phone: values.phone,
                        name: values.name,
                        address: values.address,
                    },
                },
                {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                }
            );
            queryClient.invalidateQueries({ queryKey: ['order'] });
            toast.success("Информация обновлена");
        } catch (error) {
            toast.error("Ошибка обновления данных");
            console.error(error);
        } finally {
            setLoading(false);
        }
        console.log('Success:', values);
    };

    return (
        <div>
            <Form
                layout="horizontal"
                onFinish={onFinish}
                initialValues={initialValues}
                key={JSON.stringify(initialValues)}
            >
                <div className="grid sm:grid-cols-3 sm:gap-4">
                    <Form.Item label="ФИО клиента" layout={'vertical'} name="name" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Телефон клиента" layout={'vertical'} name="phone" >
                        <InputNumber className="w-full" />
                    </Form.Item>
                    <Form.Item label="Адрес клиента" layout={'vertical'} name="address" >
                        <Input className="w-full" />
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit" className="w-full sm:w-auto sm: mt-10" loading={loading}>
                    Сохранить
                </Button>
            </Form>
        </div>
    )
}

export default ClientInfo