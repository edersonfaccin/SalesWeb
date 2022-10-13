export const dev = process.env.NODE_ENV == 'development'

export const titlePage = () => {
    return dev ? 'Sales Web - DEV MODE' : 'Sales Web'
}

interface IToast {
    toast: any
    status: "info" | "warning" | "success" | "error"
    description: string
    position?: "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left"
}

export const showToast = (toast: IToast) => {
    const renderTitle = () => {
        switch (toast.status) {
            case "info":
                return 'Informações'
            case "warning":
                return 'Aviso'
            case "success":
                return 'Sucesso'
            case "error" :
                return 'Erro'
        }
    }

    toast.toast({
        title: renderTitle(),
        description: toast.description,
        status: toast.status,
        duration: 5000,
        isClosable: true,
        position: toast?.position || 'top'
    })
}
