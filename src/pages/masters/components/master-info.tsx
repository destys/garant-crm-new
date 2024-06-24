import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { Store } from "antd/es/form/interface";
import { Button, Form, FormProps, Input, Select } from "antd";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/auth-context";

interface IMasterInfo {
    data: User
}

const MasterInfo: React.FC<IMasterInfo> = ({ data }) => {
    const [initialValues, setInitialValues] = useState<Store | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { userToken } = useAuth();

    useEffect(() => {
        const values = {
            name: data.name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            role: data.role.id.toString(),
            phone: data.phone,
            email: data.email,
        };

        setInitialValues(values);
    }, [data]);

    const onFinish: FormProps['onFinish'] = (values) => {
        setLoading(true);
        axios.put(
            `${process.env.REACT_APP_API_URL}/users/${data.id}?populate=role`,
            {

                id: data.id,
                name: values.name,
                last_name: values.last_name,
                middle_name: values.middle_name,
                role: values.role,
                phone: values.phone.toString(),
                email: values.email,
            },
            {
                headers: {
                    Authorization: "Bearer " + userToken,
                },
            }
        ).then((response) => {
            console.log('response: ', response);
            queryClient.invalidateQueries({ queryKey: ['master'] });
            toast.success("Информация обновлена");
        }).catch((error) => {
            console.log('error: ', error);
            toast.error("Ошибка обновления данных");

        }).finally(() => {
            setLoading(false);
        });
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
                    <Form.Item label="Имя" layout={'vertical'} name="name" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Фамилия" layout={'vertical'} name="last_name" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Отчество" layout={'vertical'} name="middle_name" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Телефон" layout={'vertical'} name="phone" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Email" layout={'vertical'} name="email" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Статус" layout={'vertical'} name="role">
                        <Select className="w-full">
                            <Select.Option value="1">Мастер</Select.Option>
                            <Select.Option value="3">Админ</Select.Option>
                            <Select.Option value="4">Менеджер</Select.Option>
                            <Select.Option value="5">Куратор</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit" className="w-full sm:w-auto sm: mt-10" loading={loading}>
                    Сохранить
                </Button>
            </Form>
        </div>
    )
}

export default MasterInfo