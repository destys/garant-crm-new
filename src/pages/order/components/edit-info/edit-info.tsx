import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, DatePicker, Divider, Form, FormProps, Input, Select } from "antd";
import { Order } from "../../../../types"
import { useAuth } from "../../../../context/auth-context";
import { Store } from "antd/es/form/interface";
import { useQueryClient } from "@tanstack/react-query";

interface IEditInfo {
    data: Order;
}


const EditInfo: React.FC<IEditInfo> = ({ data }) => {
    console.log('data: ', data);
    const [initialValues, setInitialValues] = useState<Store | undefined>();
    const [loading, setLoading] = useState(false);

    const { userToken } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        const values = {
            order_status: data.attributes.order_status || "Новая",
            type_of_repair: data.attributes.correct_info.type_of_repair || "Платный",
            kind_of_repair: data.attributes.correct_info.kind_of_repair || "Выездной",
            sold_date: data.attributes.correct_info.sold_date
                ? dayjs(data.attributes.correct_info.sold_date, "YYYY-MM-DD")
                : null,
            diagnostics_date: data.attributes.correct_info.diagnostics_date
                ? dayjs(data.attributes.correct_info.diagnostics_date, "YYYY-MM-DD")
                : null,
            date_issue: data.attributes.correct_info.date_issue
                ? dayjs(data.attributes.correct_info.date_issue, "YYYY-MM-DD")
                : null,
            deadline: data.attributes.correct_info.deadline
                ? dayjs(data.attributes.correct_info.deadline, "YYYY-MM-DD")
                : null,
            device: data.attributes.correct_info.device,
            brand: data.attributes.correct_info.brand,
            model: data.attributes.correct_info.model,
            model_code: data.attributes.correct_info.model_code,
            serial_number: data.attributes.correct_info.serial_number,
            equipment: data.attributes.correct_info.equipment,
            defect: data.attributes.correct_info.defect,
            conclusion: data.attributes.correct_info.conclusion,
            work_done: data.attributes.correct_info.work_done,
            estimation: data.attributes.correct_info.estimation,
            prepayment: data.attributes.correct_info.prepayment,
        };

        setInitialValues(values);
    }, [data]);


    const onFinish: FormProps['onFinish'] = (values) => {
        try {
            setLoading(true)
            // Преобразование дат в формат ISO
            const correctedValues = {
                ...values,
                sold_date: values.sold_date ? dayjs(values.sold_date).format('YYYY-MM-DD') : null,
                diagnostics_date: values.diagnostics_date ? dayjs(values.diagnostics_date).format('YYYY-MM-DD') : null,
                date_issue: values.date_issue ? dayjs(values.date_issue).format('YYYY-MM-DD') : null,
                deadline: values.deadline ? dayjs(values.deadline).format('YYYY-MM-DD') : null,
            };

            axios.put(
                `${process.env.REACT_APP_API_URL}/orders/${data.id}?populate=correct_info`,
                {
                    data: {
                        id: data.id,
                        order_status: correctedValues.order_status,
                        correct_info: correctedValues,
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
        /* console.log('Success:', values); */
    };

    return (
        <div>
            <Form
                layout="horizontal"
                onFinish={onFinish}
                initialValues={initialValues}
                key={JSON.stringify(initialValues)}
            >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 p-3 lg:p-5 border rounded">
                    {/* Статус */}
                    <Form.Item label="Статус" layout={'vertical'} name="order_status" >
                        <Select className="w-full">
                            <Select.Option value="Новая">Новая</Select.Option>
                            <Select.Option value="Согласовать">Согласовать</Select.Option>
                            <Select.Option value="Отправить инженера">Отправить инженера</Select.Option>
                            <Select.Option value="Проверить">Проверить</Select.Option>
                            <Select.Option value="Выдан">Выдан</Select.Option>
                            <Select.Option value="Отказ">Отказ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Тип ремонта" layout={'vertical'} name="type_of_repair" >
                        <Select className="w-full">
                            <Select.Option value="Платный">Платный</Select.Option>
                            <Select.Option value="Гарантийный">Гарантийный</Select.Option>
                            <Select.Option value="Гарантия СЦ">Гарантия СЦ</Select.Option>
                            <Select.Option value="На продажу">На продажу</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Вид ремонта" layout={'vertical'} name="kind_of_repair" >
                        <Select className="w-full">
                            <Select.Option value="Выездной">Выездной</Select.Option>
                            <Select.Option value="Стационарный">Стационарный</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <Divider orientation="left" plain className="!mt-6">
                    Даты
                </Divider>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 p-3 lg:p-5 border rounded">
                    <Form.Item label="Дата выезда" layout={'vertical'} name="sold_date" >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item label="Дата диагностики" layout={'vertical'} name="diagnostics_date" >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item label="Дата выдачи" layout={'vertical'} name="date_issue" >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item label="Дедлайн по заказу" layout={'vertical'} name="deadline" >
                        <DatePicker className="w-full" />
                    </Form.Item>
                </div>
                <Divider orientation="left" plain className="!mt-6">
                    Устройство
                </Divider>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 p-3 lg:p-5 border rounded">
                    <Form.Item label="Тип устройства" layout={'vertical'} name="device" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Бренд" layout={'vertical'} name="brand" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Модель" layout={'vertical'} name="model" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Код модели" layout={'vertical'} name="model_code" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Серийный номер" layout={'vertical'} name="serial_number" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Комплектация оборудования" layout={'vertical'} name="equipment" >
                        <Input className="w-full" />
                    </Form.Item>
                </div>
                <Divider orientation="left" plain className="!mt-6">
                    Заключение
                </Divider>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 p-3 lg:p-5 pb-10 border rounded">
                    <Form.Item label="Неисправность" layout={'vertical'} name="defect" className="mb-12">
                        <Input.TextArea className="w-full" style={{ resize: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Техническое заключение" layout={'vertical'} name="conclusion" className="mb-12">
                        <Input.TextArea className="w-full" style={{ resize: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Выполненные работы" layout={'vertical'} name="work_done" className="mb-12">
                        <Input.TextArea className="w-full" style={{ resize: 'none' }} />
                    </Form.Item>
                </div>
                <Divider orientation="left" plain className="!mt-6">
                    Финансы
                </Divider>
                <div className="grid sm:grid-cols-2 sm:gap-4 p-5 pb-10 border rounded">
                    <Form.Item label="Общая стоимость" layout={'vertical'} name="estimation" >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item label="Предоплата" layout={'vertical'} name="prepayment" >
                        <Input className="w-full" />
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit" className="w-full mt-6" loading={loading}>Сохранить</Button>
            </Form>
        </div>
    )
}

export default EditInfo