import { createClient } from "contentful";
import Link from "next/link";
import CustomHead from "../../components/CustomHead";
import DelightCard from "../../components/DelightCard";
import SkeletonDelightCard from "../../components/SkeletonDelightCard";
import WidthLimiter from "../../components/WidthLimiter";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

// finds url for all poisible pages
export const getStaticPaths = async () => {
  // gets thumbnail data
  const res = await client.getEntries({ 
    content_type: "thumbnails" 
  })

  // finds all paths by looking at thumbnails slugs
  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })
  
  // returns the paths
  return {
    paths,
    fallback: true
  }
}

// fall back reruns this : runs once for every page
export const getStaticProps = async ({ params }) => {
  // gets delight data
  const { items } = await client.getEntries({
    content_type: 'delights',
  })
  
  // gets delight data for just the current subpage
  const cards = items.filter(item => {
    return (item.fields.delightType[0].toLowerCase() == params.slug)
  })
  
  // if data doesn't exist (aka user entered random data in url), redirect user to the home page
  if (!cards.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  
  // returns the delights as a path
  return {
    props: { delights: cards },
    revalidate: 1
  }
}

export default function DelightsSlug({ delights }) {
  // how many blue div cards to make
  const array = [...Array(6)]
  // if subpage doesn't exist, render a skeleton page
  if (!delights) return (
    <>
    <CustomHead title="HVDelights - Undefined" />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
      {/* title */}
      <div className="flex justify-around items-center mb-4">
        <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
          Delights - Undefined
        </h1>
        <div className="group relative rounded-lg bg-amber-400 z-10 text-amber-50 py-2 px-5 outline-none">
            <button className="w-full h-full inline-flex items-center gap-1 outline-none">
              <span className="font-title">Delight Types</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-focus-within:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* creates Skeleton cards that look similar to the delight cards */}
        {array.map(index => (
          <SkeletonDelightCard key={index} />
        ))}
        </div>
      </WidthLimiter>
    </section>
    
    </>
  )
  return (
    <>
    <CustomHead title={`HVDelights - ${delights[0].fields.delightType}`} />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        {/* title */}
        <div className="flex justify-around items-center mb-4">
          <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
            {`Delights - ${delights[0].fields.delightType}`}
          </h1>

          <div className="group relative rounded-lg bg-amber-400 z-10 text-amber-50 py-2 px-5 outline-none">
            <button className="w-full h-full inline-flex items-center gap-1 outline-none">
              <span className="font-title">Delight Types</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-focus-within:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="sm:absolute z-0 top-full inset-x-3 hidden text-center sm:text-left group-focus-within:flex flex-col pt-1 sm:pt-0 pb-1 sm:pb-0 sm:border-b-2 border-amber-400 text-[22px] sm:text-[20px]">
              <Link href="/delights"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">All Delights</a></Link>
              <Link href="/delights/sandwiches"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">Sandwiches</a></Link>
              <Link href="/delights/salads"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">Salads</a></Link>
              <Link href="/delights/soups"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">Soups</a></Link>
              <Link href="/delights/snacks"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">Snacks</a></Link>
              <Link href="/delights/drinks"><a className="bg-amber-100 sm:hover:bg-amber-500 text-amber-500 sm:hover:text-amber-50 px-3 py-2 outline-none">Drinks</a></Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          {delights.map((delight) => (
            <DelightCard key={ delight.sys.id } data={ delight } />
          ))}
          
        </div>
      </WidthLimiter>
    </section>
    </>
  )
}