import Image from "next/image";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { setCookies, getCookie, checkCookies } from 'cookies-next';

export default function DelightCard({ data }) {
  // grabs data from prop
  const { thumbnail, title, description, ingredients, price, nutrition } = data.fields
  // creates price for five from default price
  const priceFive = (Math.round(price*0.95*5*100)/100).toFixed(2)
  // creates price for bulk from default price
  const priceBulkPer = (Math.round(price*0.90*100)/100).toFixed(2)

  // sets default states of radio buttons
  const [orderOne, setOrderOne] = useState(true)
  const [orderFive, setOrderFive] = useState(false)
  const [orderBulk, setOrderBulk] = useState(false)

  // handle states of orderOne
  const handleOrderOne = () => {
    if (false == orderOne) {
      // if radio button is currently false 
      // set others to false
      setOrderFive(false)
      setOrderBulk(false)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setOrderOne(!orderOne)
  }

  // handle states of orderFive
  const handleOrderFive = () => {
    if (false == orderFive) {
      // if radio button is currently false 
      // set others to false
      setOrderOne(false)
      setOrderBulk(false)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setOrderFive(!orderFive)
  }

  // handle states of orderBulk
  const handleOrderBulk = () => {
    if (false == orderBulk) {
      // if radio button is currently false 
      // set others to false
      setOrderOne(false)
      setOrderFive(false)
    }
    // set radio button to opposite of its current state (false -> true, true -> false)
    setOrderBulk(!orderBulk)
  }

  // handles bulk default text
  const [bulk, setBulk] = useState(10)
  // handles bulk changing value 
  const handleBulk = event => {
    // set bulk to user value
    setBulk(event.target.value)
  }

  // handles cart 
  const [cart, setCart] = useState()
  // handles cart changing (runs when cart changes)
  useEffect(() => {
    if (false == (bulk >= 10 && bulk <= 200)) {
      // if bulk order value is not 200 >= bulk >= 10
      // warn them to enter a value that is supported
      toast.error('You can\'t have a bulk order of less than 10 or greater than 200 items', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (true == checkCookies('cart')) {
      // cart exists in cookies
      if (typeof cart === 'object') {
        // user ordered a delight
        // creates a new cart by adding the current cart to the new cart delight
        let newCart = [...JSON.parse(getCookie('cart'))['cart'], cart]
        // sets the cart to the new cart
        setCookies('cart', {cart: newCart}, {
          path: "/",
          sameSite: true,
        })
        // notify the user they added an item to the cart
        toast.info(`Added ${cart.quantity} ${cart.title}(s) to the cart for $${cart.price}`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (typeof cart === 'object') {
      // user ordered a delight, but cart doesn't exist
      // create cart and add item to cart
      setCookies('cart', {cart: [cart]}, {
        path: "/",
        sameSite: true,
      })
    } else {
      // user has not ordered anything
      // create a cart
      setCookies('cart', {cart: []}, {
        path: "/",
        sameSite: true,
      })
    }
  }, [cart])

  // handles form submit
  const handleDelightForm = event => {
    // prevents form from reloading the page
    event.preventDefault()
    if (true == orderOne) {
      // if user wants to order one delight
      // add item to cart
      setCart({title: title, quantity: 1, price: price})
    } else if (true == orderFive) {
      // if user wants to order five delights
      // add item to cart
      setCart({title: title, quantity: 5, price: priceFive})
    } else if (true == orderBulk) {
      // if user wants to order many items
      // add item to cart
      setCart({title: title, quantity: parseInt(bulk), price: (Math.round(priceBulkPer*bulk*1000)/1000).toFixed(2)})
    } else {
      // if user didn't select an option
      // inform user to select one
      toast.error('You must select a quantity to order', {
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

  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-red-400">
      {/* image */}
      <div className="block w-full h-3/12">
        <Image 
          src={`https:${thumbnail.fields.file.url}`}
          alt={title}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          layout="responsive"
        />
      </div> 
      
      <div className="px-5 py-3">
        {/* title */}
        <h3 className="text-gray-900 text-xl font-bold mb-2">
          {title}
          </h3>
        {/* description */}
        <h4 className="text-gray-700 text-base mb-4">
          {documentToReactComponents(description)}  
        </h4>
        {/* ingredients */}
        <h5 className="text-gray-600 text-base mb-4">
          <span>Ingredients: </span>
          {ingredients.map((ingredient, index) => (
            <span key={index} className="after:content-[',\0020'] last:after:content-['.']">{ingredient}</span>
          ))}
        </h5>
        <div className="flex flex-col sm:flex-row items-center justify-between text-gray-700 mb-3 mt-2 space-y-2 sm:space-y-0">
          {/* price */}
          <ul>
            <li className="before:content-['\2022\0020']">{`One: $${price}`}</li>
            <li className="before:content-['\2022\0020']">{`Five: $${priceFive}`}</li>
            <li className="before:content-['\2022\0020']">{`Bulk: $${priceBulkPer} per`}</li>
          </ul>
          {/* nutrition */}
          <ul>
            <li className="before:content-['\2022\0020']">Nutrition...</li>
            {nutrition.map((nutrit, index) => (
              <li key={index} className="before:content-['\2022\0020']">{nutrit}</li>
            ))}
          </ul>
        </div>
        {/* radio form */}
        <form onSubmit={handleDelightForm} className="flex-col">
          <div className="inline-flex items-center justify-between w-full">
            {/* order one radio */}
            <div className="w-1/3">
              <label className="w-full hover:cursor-pointer inline-flex items-center justify-center select-none" onMouseDown={handleOrderOne}>
                <input type="radio" value="option1" checked={orderOne} readOnly/>
                <span className="bg-amber-300 ml-1 pl-3 pr-4 py-2 w-9/12 rounded">One</span>
              </label>
            </div>
            {/* order five radio */}
            <div className="w-1/3">
              <label className="w-full hover:cursor-pointer inline-flex items-center justify-center select-none" onMouseDown={handleOrderFive}>
                <input type="radio" value="option2" checked={orderFive} readOnly/>
                <span className="bg-amber-300 ml-1 pl-3 pr-4 py-2 w-9/12 rounded">Five</span>
              </label>
            </div>
            {/* order bulk radio */}
            <div className="w-1/3">
              <label className="w-full hover:cursor-pointer inline-flex items-center justify-center select-none" onMouseDown={handleOrderBulk}>
                <input type="radio" value="option3" checked={orderBulk} readOnly/>
                <input type="number" value={bulk} onChange={handleBulk} className="w-9/12 ml-1 px-3 py-1.5 text-base font-normal text-slate-700 bg-amber-300 bg-clip-padding border border-solid border-red-300 rounded transition ease-in-out focus:text-red-600 focus:bg-amber-400 focus:border-red-600 focus:outline-none"/>
              </label>
            </div>
          </div>
          {/* submit form button */}
          <div className="inline-flex justify-center w-full mt-2">
            <button type="sumbit" className="inline-block px-6 py-2 rounded ripple-bg-amber-400 text-white ">Order</button>
          </div>
        </form>
    </div>
  </div>
  )
}