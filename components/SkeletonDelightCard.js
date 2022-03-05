export default function SkeletonDelightCard() {
  return (
  <div className="blur-sm overflow-hidden rounded-lg shadow-lg bg-red-400">
    <div className="block justify-center w-full h-3/12">
      <div className="bg-slate-200 w-full h-48"></div>
    </div> 
    <div className="px-5 py-3">
      <h3 className="text-gray-900 text-xl font-bold mb-2">Lorem ipsum</h3>
      <h4 className="text-gray-700 text-base mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae officia reiciendis autem dicta ullam inventore similique hic obcaecati at neque.  
      </h4>
      <h5 className="text-gray-600 text-base mb-4">
        <span>Ingredients: </span>
          <span className="after:content-[',\0020'] last:after:content-['.']">Lorem</span>
          <span className="after:content-[',\0020'] last:after:content-['.']">Ipsum</span>
          <span className="after:content-[',\0020'] last:after:content-['.']">Dolor</span>
          <span className="after:content-[',\0020'] last:after:content-['.']">Sit</span>
          <span className="after:content-[',\0020'] last:after:content-['.']">Amet</span>
      </h5>
      <div className="flex items-center justify-between text-gray-700 mb-3 mt-2">
        <ul>
          <li className="before:content-['\2022\0020']">{`One: $Lorem`}</li>
          <li className="before:content-['\2022\0020']">{`Five: $Ispum`}</li>
          <li className="before:content-['\2022\0020']">{`Bulk: $Dolor per`}</li>
        </ul>
        <ul>
          <li className="before:content-['\2022\0020']">Nutrition...</li>
          <li className="before:content-['\2022\0020']">Lorem</li>
          <li className="before:content-['\2022\0020']">Ispum</li>
          <li className="before:content-['\2022\0020']">Dolor</li>
        </ul>
      </div>

      <form readOnly className="flex-col">
        <div className="inline-flex items-center justify-between w-full">
          <div className="w-1/3">
            <label className="w-full hover:cursor-pointer select-none">
              <input type="radio" value="option1" checked={true} readOnly/>
              <span className="bg-amber-300 ml-1 pl-3 pr-4 py-2 w-9/12 rounded">One</span>
            </label>
          </div>
          <div className="w-1/3">
            <label className="w-full hover:cursor-pointer select-none" >
              <input type="radio" value="option2" checked={false} readOnly/>
              <span className="bg-amber-300 ml-1 pl-3 pr-4 py-2 w-9/12 rounded">Five</span>
            </label>
          </div>
          <div className="w-1/3">
            <label className="w-full hover:cursor-pointer select-none" >
              <input type="radio" value="option3" checked={false} readOnly/>
              <input type="number" value={10} readOnly className="w-9/12 ml-1 px-3 py-1.5 text-base font-normal text-slate-700 bg-amber-300 bg-clip-padding border border-solid border-red-300 rounded transition ease-in-out focus:text-red-600 focus:bg-amber-400 focus:border-red-600 focus:outline-none"/>
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