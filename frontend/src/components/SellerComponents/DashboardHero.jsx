import React, {useEffect} from 'react'
import { AiOutlineEye, AiOutlineMoneyCollect } from 'react-icons/ai'
import { MdBorderClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersShop } from '../../../redux/actions/orderActions'
import styles from '../../styles/styles'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const DashboardHero = () => {
    const dispatch = useDispatch()
    const {seller} = useSelector(state => state.seller)
    const { orders } = useSelector(state => state.orders)
    const { products } = useSelector(state => state.products)
    const [deliveredOrder, setDeliveredOrder] = useState(null)

    useEffect(() => {
        dispatch(getAllOrdersShop(seller._id))
        dispatch(getAllProductsShop(seller._id))

        const orderData = orders && orders.filter((item) => item.status === "Delivered")
        setDeliveredOrder(orderData)
    }, [])

    const totalEarningWithoutTax = deliveredOrder ? deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0) : 0
    const serviceCharge = totalEarningWithoutTax * 0.1
    const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2) || 0

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "Preview",
            headerName: "",
            type: "number",
            sortable: false,
            minWidth: 100,
            flex: 0.8,
            renderCell: params => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },

    ];

    const row = []
    orders && orders.forEach(item => {
        row.push({
            id: item._id,
            itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
            total: "US$" + item.totalPrice,
            status: item.status

        })
    })
    return (
        <div className='w-full p-8'>
            <h3 className='text-[22px] font-Poppins pb-2'>Overview</h3>
            <div className="w-full block md:flex item-center justify-between">
                <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                            Account Balance <span className='text-[16px]'>(with 10% service charge)</span>
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                        ${availableBalance}
                    </h5>
                    <Link to="/dashboard-withdraw-money">
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>Withdraw Money</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <MdBorderClear
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                            All Orders
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                        {orders && orders.length}
                    </h5>
                    <Link to="/dashboard-orders">
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                            All Products
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                        {products && products.length}
                    </h5>
                    <Link to="/dashboard-products">
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>Product View</h5>
                    </Link>
                </div>

                <br />
                <h3 className='text-[22px] font-Poppins pb-2'>Latest Orders</h3>
                <div className="w-full min-h-[45vh] bg-white rounded">

                </div>
            </div>
        </div>
    )
}

export default DashboardHero
