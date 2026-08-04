import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { AiOutlineEye } from 'react-icons/ai'
import { DataGrid } from '@mui/x-data-grid'
import Loader from '../Layout/Loader'
import { getAllOrdersShop } from '../../../redux/actions/orderActions'

const AllOrders = () => {
    const { orders, isLoading } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrdersShop(user._id))
    }, [])

   
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
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
        
    ];
    const row = [];
    orders && orders.forEach(
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
                <DataGrid
                    row={row}
                    columns={columns}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClock
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10, page: 0 } }
                    }}
                    sx={{ flexGrow: 1 }} />
            </div>
            )
        </>
    )
}

export default AllOrders
