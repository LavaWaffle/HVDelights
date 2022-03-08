import WidthLimiter from "../components/WidthLimiter";
import CustomHead from "../components/CustomHead";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";

export default function CheckOut() {
  // sets default states of name inputs
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')

  // handle firstName changing values
  const handleFirst = event => {
    // set firstName to user value
    setFirstName(event.target.value)
  }

  // handle middleName changing values
  const handleMiddle = event => {
    // set middleName to user value
    setMiddleName(event.target.value)
  }

  // handle lastName changing values
  const handleLast = event => {
    // set lastName to user value
    setLastName(event.target.value)
  }

  // sets default state of email input
  const [email, setEmail] = useState('')

  // handle lastName changing values
  const handleEmail = event => {
    // set lastName to user value
    setEmail(event.target.value)
  }

  // sets default state of custom address input
  const [customInp, setCustomInp] = useState('')
  
  // handle customInp changing values
  const handleCustomInp = event => {
    // set customInp to user value
    setCustomInp(event.target.value)
  }

  // sets default states of address radio buttons
  const [HVCHS, setHVCHS] = useState(true)
  const [custom, setCustom] = useState(false)

  // handles state of HVCHS
  const handleHVCHS = () => {
    if (false == HVCHS) {
      // if radio button is currently false 
      // set custom to false
      setCustom(false)
    } else {
      // if radio is currently true
      // set custom to true
      setCustom(true)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setHVCHS(!HVCHS)
  }

  const handleCustom = () => {
    if (false == custom) {
      // if radio button is currently false 
      // set custom to false
      setHVCHS(false)
    } else {
      // if radio is currently true
      // set custom to true
      setHVCHS(true)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setCustom(!custom)
  }

  // sets default states of paytype radio buttons
  const [creditDebit, setCreditDebit] = useState(true)
  const [payPal, setPayPal] = useState(false)

  const handleCreditDebit = () => {
    if (false == creditDebit) {
      // if radio button is currently false 
      // set payPal to false
      setPayPal(false)
    } else {
      // if radio is currently true
      // set payPal to true
      setPayPal(true)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setCreditDebit(!creditDebit)
  }

  const handlePayPal = () => {
    if (false == payPal) {
      // if radio button is currently false 
      // set creditDebit to false
      setCreditDebit(false)
    } else {
      // if radio is currently true
      // set creditDebit to true
      setCreditDebit(true)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setPayPal(!payPal)
  }

  // handles form submit
  const handleCheckoutForm = event => {
    // prevents page froom reloading
    event.preventDefault()
    if (firstName.length == 0 && middleName.length == 0 && lastName.length == 0) {
      // user did not input any name
      // warn them to enter a value in the name inputs
      toast.error('You must enter a value in the name prompt', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (email.length == 0) {
      // user did not input an email
      // warn them to enter a value in the email input
      toast.error('You must enter a value in the email prompt', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if ((true == custom) && (customInp.length == 0)) {
      // user chose radio custom address but did not input an address
      // warn them to enter a value in the custom address input
      toast.error('You must enter a value in the custom address prompt', {
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
      // push the content out of hero
      setAnimate('animate__slide-out-left')
      setTimeout(() => {
        if (creditDebit) {
        // user chose to enter a credit cart
        // push user to credit card page
        Router.push('/finalizeCheckout/credit')
        } else {
        // user chose to enter paypal
        // push user to paypal page
        Router.push('finalizeCheckout/paypal')
        }
      }, 350)
    }
  }

  // set default animate state
  const [animate, setAnimate] = useState("animate__slide-in-right")
  return (
  <>
  {/* page name */}
  <CustomHead title="HV Delights - Checkout" />
  {/* hero */}
  <section className="bg-slate-500 py-10 overflow-x-hidden">
    {/* width limiter */}
    <WidthLimiter>
      {/* animate content in and out */}
      <div className={animate}>
      {/* title */}
      <div className="flex justify-center items-center">
        <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
          Checkout
        </h1>
      </div>
      {/* checkout form */}
      <form onSubmit={handleCheckoutForm}>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          {/* name label */}
          <label htmlFor="name" className="text-amber-300 text-3xl text-center font-bold mt-2">Name</label>
          {/* name inputs */}
          <div className="inline-flex flex-col sm:flex-row w-full gap-3">
            <input value={firstName} onChange={handleFirst} htmlFor="first" placeholder="First name" type="text" className="w-full sm:w-1/3 rounded py-3 px-4 outline-none focus:bg-amber-100"/>
            <input value={middleName} onChange={handleMiddle} htmlFor="middle" placeholder="Middle name" type="text" className="w-full sm:w-1/3 rounded py-3 px-4 outline-none focus:bg-amber-100"/>
            <input value={lastName} onChange={handleLast} htmlFor="last" placeholder="Last name" type="text" className="w-full sm:w-1/3 rounded py-3 px-4 outline-none focus:bg-amber-100"/>
          </div>

          {/* email label */}
          <label htmlFor="email" className="text-amber-300 text-3xl text-center font-bold mt-0">Email</label>
          {/* email inputs */}
          <input value={email} onChange={handleEmail} htmlFor="email" placeholder="Email Address" type="email" className="w-full rounded py-3 px-4 outline-none focus:bg-amber-100"/>
          
          {/* address label */}
          <label htmlFor="address" className="text-amber-300 text-3xl text-center font-bold mt-0">Address</label>
          {/* address radio */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-between w-full">
            {/* location HVCHS radio */}
            <div className="w-full sm:w-1/2">
              <label className="w-full inline-flex items-center justify-center hover:cursor-pointer select-none" onMouseDown={handleHVCHS}>
                <input type="radio" value="option1" checked={HVCHS} readOnly/>
                <span className={HVCHS ? "w-full bg-amber-200 m-1 rounded py-2.5 px-4 outline-none" : "w-full bg-white m-1 rounded py-2.5 px-4 outline-none"}>HVCHS</span>
              </label>
            </div>
            {/* location custom radio */}
            <div className="w-full sm:w-1/2">
              <label className="w-full inline-flex items-center justify-center hover:cursor-pointer select-none" onMouseDown={handleCustom}>
                <input type="radio" value="option3" checked={custom} readOnly/>
                <input value={customInp} onChange={handleCustomInp} type="text" placeholder="custom address" className={custom ? "w-full bg-amber-200 m-1 rounded py-2.5 px-4 outline-none focus:bg-amber-100" : "w-full bg-white m-1 rounded py-2.5 px-4 outline-none focus:bg-amber-100"}/>
              </label>
            </div>
          </div>
          
          {/* paytype label */}
          <label htmlFor="address" className="text-amber-300 text-3xl text-center font-bold mt-0">Pay Type</label>
          {/* paytype radio */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-between w-full">
            {/* credit / debit radio */}
            <div className="w-full sm:w-1/2">
              <label className="w-full inline-flex items-center justify-center hover:cursor-pointer select-none" onMouseDown={handleCreditDebit}>
                <input type="radio" value="option3" checked={creditDebit} readOnly/>
                <span className={creditDebit ? "w-full bg-amber-200 m-1 rounded py-2.5 px-4 outline-none" : "w-full bg-white m-1 rounded py-2.5 px-4 outline-none"}>Credit / Debit</span>
              </label>
            </div>
            {/* payPal radio */}
            <div className="w-full sm:w-1/2">
              <label className="w-full inline-flex items-center justify-center hover:cursor-pointer select-none" onMouseDown={handlePayPal}>
                <input type="radio" value="option1" checked={payPal} readOnly/>
                <span className={payPal ? "w-full bg-amber-200 m-1 rounded py-2.5 px-4 outline-none" : "w-full bg-white m-1 rounded py-2.5 px-4 outline-none"}>PayPal</span>
              </label>
            </div>
          </div>
          {/* submit button */}
          <button type="sumbit" className="inline-block px-10 py-2.5 rounded ripple-bg-amber-400 text-white">Finalize Checkout</button>
        </div>
      </form>
      </div>
    </WidthLimiter>
  </section>
  </>
  )
}
