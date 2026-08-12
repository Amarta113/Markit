import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { DataGrid } from '@mui/x-data-grid'
import Loader from '../Layout/Loader'
import { getAllOrdersShop } from '../../../redux/actions/orderActions.js'

const AllOrders = () => {
    const { orders } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrdersShop(user?._id))
    }, [])

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: params =>
                params.row.status === "Delivered" ? "greenColor" : "redColor",
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            minWidth: 150,
            flex: 1,
            renderCell: params => (
                <Link to={`/user/order/${params.id}`}>
                    <Button>
                        <AiOutlineArrowRight size={20} />
                    </Button>
                </Link>
            ),
        },
    ];

    const row = [];
    orders && orders.forEach(
        item => {
            row.push({
                id: item._id,
                itemsQty: item?.cart?.length,
                total: "US$" + item?.totalPrice,
                status: item?.status,
            })
        }
    )

    return (
        <>
            <div className='w-full mx-8 pt-1 bg-white flex flex-col min-h-[200px] max-h-[600px]'>
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClock
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10, page: 0 } }
                    }}
                    sx={{ flexGrow: 1 }} />
            </div>
            
        </>
    )
}

export default AllOrders
