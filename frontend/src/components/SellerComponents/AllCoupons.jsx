import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { AiOutlineEye } from 'react-icons/ai'
import { DataGrid } from '@mui/x-data-grid'
import Loader from '../Layout/Loader'
import { useState } from 'react'
import axios from 'axios';
import { server } from '../../server'
import {toast} from 'react-toastify' 


const AllCoupons = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState()
    const [selectedProducts, setSelectedProducts] = useState(null)
    const [value, setValue] = useState(null)
    const { products, isLoading } = useSelector((state) => state.products)
    const { seller } = useSelector((state) => state.seller)

    useEffect(() => {
        axios.get(`${server}/coupons/get-coupon/${seller._id}`,
            {withCredentials: true}
        ).then(
            res => {
                setCoupons(res?.data.couponCode)
                console.log(res)
            }
        ).catch(error => {
            console.error(error)
        })
    }, [])

    async function handleDelete(id) {
        try{
            const {data, status} = await axios.delete(
                `${server}/coupons/delete-coupon/${id}`,
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
                return (
                    <>
                        <Link to={`/product/${params.id}`}>
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
    product && product.forEach(
        item => {
            row.push({
                id: item._id,
                name: item.name,
                price: "US$" + item.discountPrice,
                sold: 10
            })
        }
    )

    return (
        <>
            isLoading? (
            <Loader />
            ): (
            <div className='w-full mx-8 pt-1 bg-white flex flex-col min-h-[200px] max-h-[600px]'>
                <div className='w-full flex justify-end'>
                    <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}>
                        <span className='text-white'>Create Coupon Code</span>
                    </div>
                </div>
                <br />
                <DataGrid
                    row={row}
                    columns={columns}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClock
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10, page: 0 } }
                    }}
                    sx={{ flexGrow: 1 }} />
                {
                    open && (
                        <div className='fixed top-0 left-0 w-full bg-[#00000062] z-[2000] flex items-center justify-center'>
                            <div className='w-[90%] h-[80vh] bg-white rounded-md shadow p-4'>
                                <div className='w-full flex justify-end'>
                                    <RxCross1
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)} />
                                </div>
                                <h5 className='text-[30px] font-[Poppins] text-center font-[600]'
                                >Create Coupon Code</h5>
                                { /* Create coupon code */}
                                <form onSubmit={handleSubmit}>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input type="text" name='name' value={name}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder='Enter your Coupon Code name...' />
                                    </div>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Discount Percentage <span className='text-red-500'>*</span>
                                        </label>
                                        <input type="numbar" name='discount' value={value}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder='Enter your Coupon Code value...' />
                                    </div>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Min Amount <span className='text-red-500'>*</span>
                                        </label>
                                        <input type="number" name='min-amount' value={minAmount}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setMinAmount(e.target.value)}
                                            placeholder='Enter your Coupon Code min amount' />
                                    </div>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Min Amount <span className='text-red-500'>*</span>
                                        </label>
                                        <input type="number" name='max-amount' value={maxAmount}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                            onChange={(e) => setMaxAmount(e.target.value)}
                                            placeholder='Enter your Coupon Code max amount.' />
                                    </div>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Select Product
                                        </label>
                                        <select className='w-full mt-2 border border-bray-300 h-[35px] rounded-[5px]'
                                            value={selectedProducts}
                                            onChange={(e) => setSelectedProducts(e.target.value)}
                                        >
                                        <option value="Choose your selected product">
                                            Choose a selected product
                                        </option>
                                        {
                                            products && product.map((data, i) => (
                                                <option value={data.name} key={i}>
                                                    {data.name}
                                                </option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                    <br />
                                    <input type="submit"
                                    value="Create" 
                                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer'/>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
            )
        </>
    )
}

export default AllCoupons
