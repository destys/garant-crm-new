import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Client } from "../types";


const getData = async (id: number): Promise<Client> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${id}?populate=deep`, {
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });
    return response.data.data;
}

const useClient = (id: number) => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['client'], queryFn: () => getData(id) })

    return { data, isLoading, isError }
}

export default useClient