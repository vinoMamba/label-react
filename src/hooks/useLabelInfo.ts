import useSwr from 'swr'
import {labelSchema} from "../core/schema";
import {createHeaders} from "../shared/header";
import {Schema} from "../types/type";

const fetcher = (url: string, auth: string) => fetch(url, {
    method: 'GET',
    headers: createHeaders(auth)
}).then((res) => res.json())

export const useLabelInfo = (auth: string) => {
    const {
        data,
    } = useSwr([`/api/asset/label/label_info/?selectedLabel=4`, auth], ([url, auth]) => fetcher(url, auth), {})
    if (data) {
        const str = data.data.labelField
        const label = JSON.parse(str)
        return {
            label: label as Schema,
        }
    } else {
        return {
            label: labelSchema as Schema,
        }
    }
}
