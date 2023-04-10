import useSwr from 'swr'
import {createHeaders} from "../shared/header";
import {useFieldListStore} from "../store/useFieldListStore";

const fetcher = (url: string, auth: string) => fetch(url, {
    method: 'GET',
    headers: createHeaders(auth)
}).then((res) => res.json())

export const useFieldList = (auth: string) => {
    const [setFieldList] = useFieldListStore((state) => [state.setFieldList])
    const {
        data,
        error
    } = useSwr([`/api/upms/sys_field/label_field_list`, auth], ([url, auth]) => fetcher(url, auth), {})
}
