import Header from "../components/Layout/Header"
import Checkout from "../components/UserComponents/Checkout"
import CheckoutSteps from '../components/UserComponents/CheckoutSteps'
import Footer from "../components/Layout/Footer"

function CheckoutPage(){
    return(
        <div>
            <Header/>
            <br />
            <br />
            <CheckoutSteps active={1}/>
            <Checkout/>
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default CheckoutPage