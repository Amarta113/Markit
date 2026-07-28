import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentInfo = (
  user,
  open,
  setOpen,
  onApprove,
  paymentHandler,
  cashOnDeliveryHandler
) => {
  const [select, setSelect] = useState(1)

  return (
    <div className='w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8'>
      {/* select buttons */}
      <div className="flex w-full pb-5 border-b mb-2">
        <div
          className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1abc4] relative flex items-center justify-center"
          onClick={() => setSelect(1)}>
          {select === 1 ? (
            <div className="w-[13px] h-[13px] bg-[1d1a1acb] rounded-full" />
          ) : null}
        </div>
        <h4
          className='text-[18px] pl-2 font-[600] text-[#000000b1]'
        >Pay with Debit/Credit card </h4>
      </div>

      {/* pay with card */}
      {
        select1 ? (
          <div className="w-full flex border-b">
            <form className='w-full' onSubmit={paymentHandler} >
              <div className='w-full flex pb-3'>
                <div className='w-[50%]'>
                  <label className='block pb-2'>Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input}!w-[95%] text-[#444]`}
                    value={user && user.name} />
                </div>
                <div className='w-[50%]'>
                  <label className='block pb-2'>Exp Date</label>
                  <CardExpiryElement className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444"
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          }
                        }
                      }
                    }} />
                </div>
              </div>
              <div className="w-full flex pb-3">
                <div className="w-[95%]">
                  <label className='block pb-2'>Card Number</label>
                  <CardNumberElement className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444"
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          }
                        }
                      }
                    }} />
                </div>
                <div className="w-[50%]">
                  <label
                    className="block pb-2">CVV</label>
                  <CardCvcElement 
                    className={`${styles.input}` }
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444"
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          }
                        }
                      }
                    }} />
                </div>
              </div>
            </form>
          </div>
        ) : null
      }
    </div>
  )
}

export default PaymentInfo
