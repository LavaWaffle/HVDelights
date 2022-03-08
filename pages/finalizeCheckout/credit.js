import CustomHead from "../../components/CustomHead";
import WidthLimiter from "../../components/WidthLimiter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { getCookie, checkCookies, removeCookies } from 'cookies-next';
import Router from "next/router";
import DelightTableRow from "../../components/DelightTableRow";
import DelightTableRowEmpty from "../../components/DelightTableRowEmpty";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function credits() {
  let cart
  let sum 
  if (true == checkCookies('cart')) {
    // if cart data exists
    // grab cart data from cookies
    cart = (JSON.parse(getCookie('cart'), {sameSite: true}).cart)
    // create sum from cart data
    sum = (Math.round((cart.map(delight => delight.price).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0))*100)/100)
  } else {
    // cart doesn't exist
    // set cart to empty array
    cart = []
    // create sum of 0
    sum = 0
  }

  // sets default state of credit input
  const [credit, setCredit] = useState('')

  // handle credit changing values
  const handleCredit = event => {
    // set credit to user value
    setCredit(event.target.value)
  }

  // sets default state of expiration input
  const [expiration, setExpiration] = useState('')
  
  // handle expiration changing values
  const handleExpiration = event => {
    // set expiration to user value
    setExpiration(event.target.value)
  }

  // sets default state of security input
  const [security, setSecurity] = useState('')

  // handle security changing values
  const handleSecurity = event => {
    // set security to user value
    setSecurity(event.target.value)
  }

  // sets default state of date input
  const [startDate, setStartDate] = useState(new Date());

  // handle date changing values
  const handleDate = date => {
    // set date to user value
    setStartDate(date)
  }

  // handles form submit
  const handleCreditForm = event => {
    // prevents page froom reloading
    event.preventDefault()
    if (credit.length == 0) {
      // user did not input credit cart info
      // warn them to enter a value in the credit input
      toast.error('You must enter a value in the credit card prompt', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (expiration.length == 0) {
      // user did not input expiration info
      // warn them to enter a value in the expration input
      toast.error('You must enter a value in the expiration prompt', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (security.length == 0) {
      // user did not enter security info
      // warn them to enter a value in the secruity input
      // warn them to enter a value in the credit input
      toast.error('You must enter a value in the security prompt', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // user passed all checks
      // remove cookies
      removeCookies('cart')
      // push the content out of hero
      setAnimate('animate__slide-out-left')
      // push user to order gratification page
      setTimeout(() => {Router.push('/orderGrat')}, 350)
    }
  }

  // set default animate state
  const [animate, setAnimate] = useState('animate__slide-in-right')
  return (
    <>
    {/* page name */}
    <CustomHead title="HV Delights - Finalize Checkout" />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        {/* animate content in and out */}
        <div className={animate}>
        {/* title */}
        <div className="flex justify-center items-center">
          <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
            Finalize Checkout
          </h1>
        </div>
        {/* checkout form */}
        <form onSubmit={handleCreditForm}>
          <div className="flex flex-col sm:flex-row items-start justify-center w-full gap-4">
            {/* left */}
            <div className="w-full sm:w-1/2">
              {/* name label */}
              <label htmlFor="name" className="block text-amber-300 text-3xl text-center font-bold mt-2">Credit Card Information</label>
              {/* name inputs */}
              <div className="space-y-3 mt-3">
                <input value={credit} onChange={handleCredit} htmlFor="Credit Cart Number" placeholder="Credit Card Number" type="text" className="w-full rounded py-3 px-4 outline-none focus:bg-amber-100"/>
                <input value={expiration} onChange={handleExpiration} htmlFor="Expiration" placeholder="Expiration: mm/yyyy" type="text" className="w-full rounded py-3 px-4 outline-none focus:bg-amber-100"/>
                <input value={security} onChange={handleSecurity} htmlFor="Security Code" placeholder="Security Code" type="text" className="w-full rounded py-3 px-4 outline-none focus:bg-amber-100"/>
              </div>

              {/* date and time label */}
              <label htmlFor="name" className="block text-amber-300 text-3xl text-center font-bold mt-2">Date & Time</label>
              <div className="space-y-3 mt-3">
                <DatePicker selected={startDate} onChange={handleDate} showTimeSelect dateFormat="Pp" className="w-full rounded py-3 px-4 outline-none focus:bg-amber-100" />
              </div>
            </div>
            {/* right */}
            <div className="w-full sm:w-1/2">
              {/* cart */}
              <div className="inline-flex items-center justify-center w-full">
                <table className="w-full bg-red-400 text-center text-xl ">
                  {/* cart head */}
                  <thead className="text-gray-100 text-bold">
                    <tr>
                      <th className="py-[0.25rem] px-2">
                        Delight
                      </th>
                      <th className="py-[0.25rem] px-2">
                        Quantity
                      </th>
                      <th className="py-[0.25rem] px-2">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="border-t-[2px] border-slate-500">
                  { cart.length > 0 ? 
                  // cart has data
                  // display cart
                  cart.map((delight, index) => (
                    <DelightTableRow key={1+(index*index)} data={delight} sm={true}/>
                  )) : 
                  // cart doesn't have data
                  // display that the cart doesn't have data
                  <DelightTableRowEmpty />
                  }
                  </tbody>
                  {/* cart subhead */}
                  <thead className="text-gray-100 text-bold">
                    <tr>
                      <th className="py-[0.25rem] px-2 text-center" colSpan="3">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  {/* cart total price */}
                  <tbody className="border-t-[2px] border-slate-500">
                    <tr className="bg-stone-400 hover:bg-stone-300 text-amber-200 animate__animated animate__backInUp">
                      <td className="py-[0.25rem] px-2 text-center" colSpan="3">
                        ${sum}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            {/* submit button */}
            <button type="sumbit" className="inline-block px-10 py-2.5 rounded ripple-bg-amber-400 text-white">Confirm Order</button>
          </div>
        </form>
        </div>
      </WidthLimiter>
    </section>
    </>
  )
}
