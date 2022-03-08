import Link from "next/link";
import CustomHead from "../../components/CustomHead";
import WidthLimiter from "../../components/WidthLimiter";
import DelightCard from "../../components/DelightCard";
import { createClient } from 'contentful'

export async function getStaticProps() {
  // grabs client with space id and access token
  const client = createClient({ 
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  
  // grabs delight content data from contentful 
  const delightRes = await client.getEntries({
    content_type: 'delights',
  })

  // returns the data as props to the element
  return {
    props: {
      delights: delightRes.items,
    },
    // check for updates to data 1 second after page is loaded
    revalidate: 1,
  }
}

export default function Delights({ delights }) {
  return (
    <>
    {/* page name */}
    <CustomHead title="HVDelights - Delights" />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        {/* title */}
        <div className="flex justify-around items-center mb-4">
          <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
            Delights
          </h1>
          {/* submenu button */}
          <div className="group relative rounded-lg bg-amber-400 z-10 text-amber-50 py-2 px-5 outline-none">
            <button tabIndex="0" className="w-full h-full inline-flex items-center gap-1 outline-none">
              <span className="font-title">Delight Types</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-focus-within:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* submenu content */}
            <div className="absolute z-0 top-full inset-x-3 hidden text-left group-focus-within:flex flex-col pt-0 pb-0 border-b-2 border-amber-400 text-[20px]">
              <Link tabIndex="0" href="/delights"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">All Delights</a></Link>
              <Link tabIndex="0" href="/delights/sandwiches"><a className="bg-amber-100 hover:bg-amber-500 text-amber-500 hover:text-amber-50 px-3 py-2 outline-none">Sandwiches</a></Link>
              <Link tabIndex="0" href="/delights/salads"><a className="bg-amber-100 hover:bg-amber-500 text-amber-500 hover:text-amber-50 px-3 py-2 outline-none">Salads</a></Link>
              <Link tabIndex="0" href="/delights/soups"><a className="bg-amber-100 hover:bg-amber-500 text-amber-500 hover:text-amber-50 px-3 py-2 outline-none">Soups</a></Link>
              <Link tabIndex="0" href="/delights/snacks"><a className="bg-amber-100 hover:bg-amber-500 text-amber-500 hover:text-amber-50 px-3 py-2 outline-none">Snacks</a></Link>
              <Link tabIndex="0" href="/delights/drinks"><a className="bg-amber-100 hover:bg-amber-500 text-amber-500 hover:text-amber-50 px-3 py-2 outline-none">Drinks</a></Link>
            </div>
          </div>
        </div>
        {/* grid */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* delight cards */}
          {delights.map((delight) => (
            <DelightCard key={ delight.sys.id } data={ delight } />
          ))}
        </div>
      </WidthLimiter>
    </section>
    </>
  )
}