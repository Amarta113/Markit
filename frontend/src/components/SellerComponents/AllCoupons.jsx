import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { DataGrid } from '@mui/x-data-grid'
import Loader from '../Layout/Loader'
import { useState } from 'react'
import axios from 'axios';
import { server } from '../../server.js'
import {toast} from 'react-toastify' 
import styles from '../../styles/styles'
import { RxCross1 } from "react-icons/rx";
import { getAllProductsShop } from '../../../redux/actions/productActions.js'


const AllCoupons = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [coupons, setCoupons] = useState([])
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState()
    const [selectedProducts, setSelectedProducts] = useState("")
    const [value, setValue] = useState(null)
    const { products } = useSelector((state) => state.products)
    const { seller } = useSelector((state) => state.seller)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        if (seller?._id) {
            dispatch(getAllProductsShop(seller._id));
            axios.get(`${server}/coupon/get-coupon/${seller._id}`,
                {withCredentials: true}
            ).then((res) => 
                {
                    setIsLoading(false)
                    setCoupons(res?.data.couponCodes || [])
                }
            ).catch(error => {
                setIsLoading(false)
                console.error(error)
                setCoupons([])
            })
        }
    }, [dispatch, seller?._id])

    async function handleDelete(id) {
        try{
            const {data, status} = await axios.delete(
                `${server}/coupon/delete-coupon/${id}`,
                { withCredentials: true }
            )
            if (status === 201){
                toast.success(data?.message)
                window.location.reload()
            }
        } catch(error) {
            toast.error(error.message)  
        }
   
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const {data, status} = await axios.post(`${server}/coupon/create-coupon-code`,
                {
                    name,
                    minAmount,
                    maxAmount,
                    selectedProducts,
                    value,
                    shopId: seller._id
                }, {
                    withCredentials: true
                }
            );
            if (status === 201){
                setOpen(false)
                toast.success("Coupon created for the product")
                window.location.reload()
            }
        }catch(error){
            toast.error(error?.response?.data.message)  
        }
    }


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
                const data = params.row.name;
                const product_name = data.replace(/\s+/g, "-")
                return (
                    <>
                        <Link to={`/products/${product_name}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: params => {
                return (
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];
    const row = [];
    coupons && coupons.forEach(
        item => {
            row.push({
                id: item._id,
                name: item.name,
                price: item.value + " %",
                sold: item.sold_out
            })
        }
    )

    return (
        <>
        <div className='w-full mx-8 pt-1 mt-10 bg-white flex flex-col min-h-[200px] max-h-[800px]'>
                <div className='w-full flex justify-end'>
                    <div 
                    className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                    onClick={() => setOpen(true)}
                    >
                        <span className='text-white'>Create Coupon Code</span>
                    </div>
                </div>
                <br />
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClock
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10, page: 0 } }
                    }}
                    sx={{ flexGrow: 1 }} />
                {
                    open && (
                        <div className='fixed inset-0 bg-[#00000062] z-[2000] flex items-center justify-center p-2 overflow-y-auto'>
                            <div className='w-full max-w-[700px] max-h-[85vh] bg-white rounded-md shadow p-4 overflow-y-auto'>
                                <div className='w-full flex justify-end'>
                                    <RxCross1
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)} />
                                </div>
                                <h5 className='text-[30px] font-[Poppins] text-center font-[600]'>Create Coupon Code</h5>
                                <form onSubmit={handleSubmit} aria-required={true} className='space-y-4'>
                                    <div>
                                        <label className='pb-2'>
                                            Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input type="text" 
                                            name='name' 
                                            value={name}
                                            required
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder='Enter your Coupon Code name...' />
                                    </div>
                                    <div>
                                        <label className='pb-2'>
                                            Discount Percentage <span className='text-red-500'>*</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            name='discount' 
                                            required
                                            value={value}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder='Enter your Coupon Code value...' />
                                    </div>
                                    <div>
                                        <label className='pb-2'>
                                            Min Amount <span className='text-red-500'>*</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            name='min-amount' 
                                            value={minAmount}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setMinAmount(e.target.value)}
                                            placeholder='Enter your Coupon Code min amount' />
                                    </div>
                                    <div>
                                        <label className='pb-2'>
                                            Max Amount <span className='text-red-500'>*</span>
                                        </label>
                                        <input type="number" name='max-amount' value={maxAmount}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setMaxAmount(e.target.value)}
                                            placeholder='Enter your Coupon Code max amount.' />
                                    </div>
                                    <div>
                                        <label className='pb-2'>
                                            Select Product
                                        </label>
                                        <select className='w-full mt-2 border border-gray-300 h-[35px] rounded-[5px]'
                                            value={selectedProducts}
                                            onChange={(e) => setSelectedProducts(e.target.value)}
                                        >
                                            <option value="Choose your selected product">
                                                Choose a selected product
                                            </option>
                                            {
                                                products && products.map((data, i) => (
                                                    <option value={data.name} key={i}>
                                                        {data.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <input type="submit"
                                        value="Create" 
                                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer'/>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default AllCoupons
