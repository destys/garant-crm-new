import axios from "axios";
import { Order } from "../types";
import { useQuery } from "@tanstack/react-query";


const getData = async (id: number): Promise<Order> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${id}?populate=*`, {
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });
    return response.data.data;
}

const useOrder = (id: number) => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['order'], queryFn: () => getData(id) })

    return { data, isLoading, isError }
}

export default useOrder