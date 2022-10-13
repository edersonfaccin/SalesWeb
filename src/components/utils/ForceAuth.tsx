import SignIn from "../../../pages/signin"
import useAuthData from "../../data/hook/useAuthData"
import SpinnerDefault from "../spinner/SpinnerDefault"

const ForceAuth = (props: any) => {

    const { user, loading } = useAuthData()

    const renderContent = () => {
        return (
            <>
                { props.children }
            </>
        )
    }

    const renderLoading = () => {
        return (
            <SpinnerDefault />
        )
    }

    if(!loading && user?.email){
        return renderContent()
    }else if(loading){
        return renderLoading()
    }else if(!user?.email){
        return <SignIn/>
    }
}

export default ForceAuth