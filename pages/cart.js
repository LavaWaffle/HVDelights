import CustomHead from "../components/CustomHead";
import WidthLimiter from "../components/WidthLimiter";
import { getCookie, checkCookies } from 'cookies-next';
import Router from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import DelightTableRow from "../components/DelightTableRow";
import DelightTableRowEmpty from "../components/DelightTableRowEmpty";

export default function Cart() {
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

  // handles form submit
  const handleNextForm = event => {
    // prevents page froom reloading
    event.preventDefault()
    
    if (cart.length > 0) {
    // user hasitems in cart
    // push content out of hero
    setAnimate('animate__slide-out-left')
    // pushes user to checkout page
    setTimeout(() => {Router.push('/checkout')}, 350)
    } else {
      toast.info('Add delights to the cart before checking out', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  
  // set default animate state
  const [animate, setAnimate] = useState('')
  return (
  <>
  {/* page name */}
  <CustomHead title="HV Delights - Cart" />
  {/* hero */}
  <section className="bg-slate-500 py-10">
    {/* width limiter */}
    <WidthLimiter>
      {/* animate content out */}
      <div className={animate}>
      {/* title */}
      <div className="flex justify-center items-center">
        <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
          Cart
        </h1>
      </div>

      {/* cart */}
      <div className="flex items-center justify-center w-full">
        <table className="w-fit sm:w-fit md:w-10/12 lg:w-9/12 bg-red-400 text-center md:text-left text-xl sm:text-3xl">
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
            <DelightTableRow key={1+(index*index)} data={delight} />
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
      {/* next button */}
      <form onSubmit={handleNextForm}>
        <div className="inline-flex justify-center w-full mt-4">
          <button type="sumbit" className="inline-block px-10 py-2.5 rounded ripple-bg-amber-400 text-white">Checkout</button>
        </div>
      </form>
      </div>
    </WidthLimiter>
  </section>
  </>
  )
}
