import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

export default function SellerProtectedRoute({children }) {
    const { isSeller, isLoading } = useSelector(state => state.seller);

    if (isLoading === true) return <Loader />;
    else {
        if (!isSeller) return <Navigate to={`/shop-login`} replace />;
    }

    return <div>{children}</div>;
}