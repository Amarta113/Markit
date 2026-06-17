import { Navigate } from "react-router-dom"

export default function SellerProtectedRoute ({isSeller, children}){
    if(!isSeller){
        return <Navigate to={`/`} replace />
    }
    return children
}