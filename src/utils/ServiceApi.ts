import axios from 'axios'

const setDefaultsAxios = async() => {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.timeout = 5000
}

const getMethod = async(api: string, method?: string) => {
    const url = method ? `${api}/${method}` : api

    try {
        setDefaultsAxios()
        
        var res = await axios.get(url)
        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data);
        }
    } catch (error: any) {
        throw new Error(error);
    }
}

const postMethod = async(api: string, method?: string, data?: any) => {
    const url = method ? `${api}/${method}` : api

    try {
        setDefaultsAxios()
        
        const res = await axios.post(url, data)

        if(res.status == 200 || res.status == 201){
            return res.data
        }else{
            throw new Error(res.data);
        }
    } catch (error: any) {
        throw new Error(error);
    }
}

export { getMethod, postMethod }