import Image from "next/image";
import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function DelightCard({ data }) {
  const { thumbnail, title, description, ingredients, price, nutrition } = data.fields
  const priceFive = Math.round(price*0.95*5*100)/100
  const priceBulkPer = Math.round(price*0.90*100)/100

  const [orderOne, setOrderOne] = useState(true)
  const [orderFive, setOrderFive] = useState(false)
  const [orderBulk, setOrderBulk] = useState(false)

  const handleOrderOne = () => {
    if (false == orderOne) {
      setOrderFive(false)
      setOrderBulk(false)
    }
    setOrderOne(!orderOne)
  }
  const handleOrderFive = () => {
    if (false == orderFive) {
      setOrderOne(false)
      setOrderBulk(false)
    }
    setOrderFive(!orderFive)
  }
  const handleOrderBulk = () => {
    if (false == orderBulk) {
      setOrderOne(false)
      setOrderFive(false)
    }
    setOrderBulk(!orderBulk)
  }

  const [bulk, setBulk] = useState(10)
  const handleBulk = event => {
    if (event.target.value > 10) { 
      setBulk(event.target.value)
    } else {
      toast.info('You can\'t have a bulk order of less than 10 items', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleDelightForm = event => {
    event.preventDefault()
    if (true == orderOne) {
      toast.info(`Added 1 ${title} to the cart for $${price}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (true == orderFive) {
      toast.info(`Added 5 ${title}s to the cart for $${priceFive}`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info(`Added ${bulk} ${title}s to the cart for $${Math.round(priceBulkPer*bulk*1000)/1000}`, {
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
      <div className="block justify-center w-full h-3/12">
        <Image 
          src={`https:${thumbnail.fields.file.url}`}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          layout="responsive"
        />
      </div> 
      <div className="px-5 py-3">
        <h3 className="text-gray-900 text-xl font-bold mb-2">{title}</h3>
        <h4 className="text-gray-700 text-base mb-4">
          {documentToReactComponents(description)}  
        </h4>
        <h5 className="text-gray-600 text-base mb-4">
          <span>Ingredients: </span>
          {ingredients.map((ingredient, index) => (
            <span key={index} className="after:content-[',\0020'] last:after:content-['.']">{ingredient}</span>
          ))}
        </h5>
        <div className="flex items-center justify-between text-gray-700 mb-3 mt-2">
          <ul>
            <li className="before:content-['\2022\0020']">{`One: $${price}`}</li>
            <li className="before:content-['\2022\0020']">{`Five: $${priceFive}`}</li>
            <li className="before:content-['\2022\0020']">{`Bulk: $${priceBulkPer} per`}</li>
          </ul>
          <ul>
            <li className="before:content-['\2022\0020']">Nutrition...</li>
            {nutrition.map((nutrit, index) => (
              <li key={index} className="before:content-['\2022\0020']">{nutrit}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleDelightForm} className="flex-col">
          <div className="inline-flex items-center justify-between w-full">
            <div className="w-1/3">
              <label className="w-full hover:cursor-pointer select-none" onMouseDown={handleOrderOne}>
                <input type="radio" value="option1" checked={orderOne} readOnly/>
                <span className="bg-amber-300 ml-1 pl-3 pr-4 py-2 w-9/12 rounded">One</span>
              </label>
            </div>
            <div className="w-1/3">
              <label className="w-full hover:cursor-pointer select-none" onMouseDown={handleOrderFive}>
                <input type="radio" value="option2" checked={orderFive} readOnly/>
                <span className="bg-amber-300 ml-1 pl-3 pr-4 py-2 w-9/12 rounded">Five</span>
              </label>
            </div>
            <div className="w-1/3">
              <label className="w-full hover:cursor-pointer select-none" onMouseDown={handleOrderBulk}>
                <input type="radio" value="option3" checked={orderBulk} readOnly/>
                <input type="number" value={bulk} onChange={handleBulk} className="w-9/12 ml-1 px-3 py-1.5 text-base font-normal text-slate-700 bg-amber-300 bg-clip-padding border border-solid border-red-300 rounded transition ease-in-out focus:text-red-600 focus:bg-amber-400 focus:border-red-600 focus:outline-none"/>
              </label>
            </div>
          </div>
          <div className="inline-flex justify-center w-full mt-2">
            <button type="sumbit" className="inline-block px-6 py-2 rounded ripple-bg-amber-400 text-white ">Order</button>
          </div>
        </form>
    </div>
  </div>
  )
}