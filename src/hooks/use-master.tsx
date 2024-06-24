import axios from "axios";
import { User } from "../types";
import { useQuery } from "@tanstack/react-query";

const getData = async (id: number): Promise<User> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}?populate=role`, {
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });
    return response.data;
}

const useMaster = (id: number) => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['master'], queryFn: () => getData(id) })

    return { data, isLoading, isError }
}

export default useMaster