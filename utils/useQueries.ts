import { useMutation, useQuery } from "@tanstack/react-query"
import axiosClient from "./axiosClient"

const getData: (link: string) => any = (link: string) => {
    return axiosClient(link)
}

export const useGetData: (link: string) => any = (link: string) => {
    const query = useQuery({
        queryFn: () => getData(link),
        queryKey: ["something"],
    })
    return query
}

const postData: (link: string, data: any) => any = (
    link: string,
    data: any
) => {
    axiosClient.post(link, data)
}
export const usePostData: (link: string) => any = (link: string) => {
    const mutation = useMutation({
        mutationFn: (data) => postData(link, data),
    })
    return mutation
}
