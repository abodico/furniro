import { useMutation, useQuery } from "@tanstack/react-query"
import axiosClient from "./axiosClient"

const getData: (link: string) => any = async (link: string) => {
    return await axiosClient(link)
}

export const useGetData: (link: string, enabled?: boolean) => any = (
    link: string,
    enabled = true
) => {
    const query = useQuery({
        queryFn: () => getData(link),
        queryKey: ["data", link],
        enabled: enabled,
        refetchOnWindowFocus: false,
    })
    return query
}

const updateData: (link: string, data: any) => any = (
    link: string,
    data: any
) => {
    axiosClient.put(link, data)
}

export const useUpdateData: (link: string) => any = (link: string) => {
    const mutation = useMutation({
        mutationFn: (data) => updateData(link, data),
    })
    return mutation
}

const deleteData: (link: string) => any = (link: string) => {
    axiosClient.delete(link)
}

export const useDeleteData: () => any = () => {
    const mutation = useMutation({
        mutationFn: (link: string) => deleteData(link),
    })
    return mutation
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
