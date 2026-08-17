import React, { useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { AiOutlineArrowRight, AiOutlineEye } from "react-icons/ai"; 
import { useDispatch, useSelector } from 'react-redux';
import {getAllOrdersUser } from '../../../redux/actions/orderActions';


const AllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersUser(user?._id))
  }, [])

  const refundOrders = orders && orders.filter((item) => item.status === "Processing refund")
  
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
  refundOrders && refundOrders.forEach(
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
    <div className='pl-8 pt-1'>
      <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={[10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } }
        }}
        disableRowSelectionOnClick
        sx={{ flexGrow: 1 }}
      />
    </div>
  )
}

export default AllRefundOrders
