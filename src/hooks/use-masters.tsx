import axios from "axios";
import { User } from "../types";
import { useQuery } from "@tanstack/react-query";

const getData = async (): Promise<User[]> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?populate=role`, {
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });
    return response.data;
}

const useMasters = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['masters'], queryFn: getData })

    return { data, isLoading, isError }
}

export default useMasters