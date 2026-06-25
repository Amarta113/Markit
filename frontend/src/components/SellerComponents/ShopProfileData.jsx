import React from 'react'

const ShopProfileData = ({isOwner}) => {
  return (
    <div className='w-full'>
      <div className="flex w-full items-center justify-between">
          <div className="flex item-center">
            <h5 className={`font-[600] text-[20px] text-red-500`}>
              Shop Products
            </h5>
          </div>
      </div>
    </div>
  )
}

export default ShopProfileData
