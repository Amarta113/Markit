import React, { useState } from 'react'
import { backend_url } from '../../server'
import { useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera } from 'react-icons/ai'
import styles from '../../styles/styles'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import AllRefundOrders from './AllRefundOrders'
import TrackOrder from './TrackOrder.jsx'

const ProfileContent = ({ active }) => {
    const { user } = useSelector((state) => state.user)
    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [phoneNumber, setPhoneNumber] = useState()
    const [zipCode, setZipCode] = useState()
    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='w-full'>
            {/* Profile page */}
            {
                active === 1 && (
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            <img src={`${backend_url}${user?.avatar}`}
                                className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
                                alt="profile-img" />
                            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                <AiOutlineCamera />
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full px-5">
                            <form onSubmit={handleSubmit} aria-required={true}>
                                <div className="w-full flex pb-3">
                                    <div className="w-[50%]">
                                        <label className='block pb-2'>
                                            Full name
                                        </label>
                                        <input type="text" className={`${styles.input} !w-[95%]`}
                                            required
                                            value={user.name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <label className='block pb-2'>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className={`${styles.input} !w-[95%]`}
                                            required
                                            value={user.email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex pb-3">
                                    <div className="w-[50%]">
                                        <label className='block pb-2'>
                                            Phone Number
                                        </label>
                                        <input type="number"
                                            className={`${styles.input} !w-[95%]`}
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <label className='block pb-2'>
                                            Zip Code
                                        </label>
                                        <input
                                            type="number"
                                            className={`${styles.input} !w-[95%]`}
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex pb-3">
                                    <div className="w-[50%]">
                                        <label className='block pb-2'>
                                            Address 1
                                        </label>
                                        <input type="address"
                                            className={`${styles.input} !w-[95%]`}
                                            required
                                            value={address1}
                                            onChange={(e) => setAddress1(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <label className='block pb-2'>
                                            Address2
                                        </label>
                                        <input
                                            type="address"
                                            className={`${styles.input} !w-[95%]`}
                                            required
                                            value={address2}
                                            onChange={(e) => setAddress2(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <input
                                    className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                                    required
                                    value="Upload"
                                    type="submit" />
                            </form>
                        </div>
                    </div>
                )
            }
            {/*Order page*/}
            {
                active === 2 && (
                    <div>
                        <AllOrders />
                    </div>
                )
            }
            {/*All refund Order page*/}
            {
                active === 3 && (
                    <div>
                        <AllRefundOrders />
                    </div>
                )
            }
             {/* Track Order page */}
            {
                active === 5 && (
                    <div>
                        <TrackOrder />
                    </div>
                )
            }
        </div>
    )
}

const AllOrders = () => {
    const { orders } = useSelector(state => state.orders);
    const { user } = useSelector(state => state.user);
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
]
    const row = [];
    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus
        })
    })
    
    return (
        <div className="pl-8 pt-l flex flex-col min-h-[200px] max-h-[600px]">
            <DataGrid
                row = {row}
                columns = {columns}
                pageSizeOptions={[10]}
                initialState={{
                    pagination: {paginationModel: {pageSize: 10, page: 0}}
                }}
                disableRowSelectionOnClick
                sx={{flexGrow: 1}}
                />
        </div>
    )
}

export default ProfileContent