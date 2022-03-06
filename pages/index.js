import Image from "next/image";
import CustomHead from '../components/CustomHead'
import WidthLimiter from "../components/WidthLimiter";
import { createClient } from 'contentful'
import ThumbnailCard from "../components/ThumbnailCard";
import ReviewCard from "../components/ReviewCard";

export async function getStaticProps() {
  // grabs client with space id and access token
  const client = createClient({ 
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  
  // grabs thumbnail content data from contentful 
  const thumbRes = await client.getEntries({
    content_type: 'thumbnails',
  })

  // grabs review content data from contentful
  const revRes = await client.getEntries({
    content_type: 'reviews',
  })

  // returns the data as props to the element
  return {
    props: {
      thumbnails: thumbRes.items,
      reviews: revRes.items,
    },
    // check for updates to data 1 second after page is loaded
    revalidate: 1,
  }
}

export default function Home({ thumbnails, reviews }) {
  return (
    <>
    {/* page name */}
    <CustomHead title="HVDelights - Home" />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        {/* flex */}
        <div className="flex flex-col sm:flex-row space-y-10 sm:space-y-0">
          {/* left */}
          <div className="inline-flex flex-col items-center w-full sm:w-1/2">
            {/* title */}
            <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
              Healthy and Delicious Food
            </h1>
            {/* salad image */}
            <div className="aspect-4000/4250 object-cover rounded-lg shadow-xl overflow-hidden">
              <Image 
                src="/salad-home.jpg"
                alt="Healthy Salad"
                width="4000"
                height="4250"
              />
            </div>
          </div>
          {/* right */}
          <div className="inline-flex flex-col items-center w-full sm:w-1/2">
            {/* sub title */}
            <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
              Delightful Cuisine
            </h1>
            {/* flex */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
              {/* thumbnail cards */}
              {thumbnails.map(thumbnail => (
                <ThumbnailCard key={ thumbnail.sys.id } data={ thumbnail } />
              ))}
            </div>
          </div>
        </div>
      </WidthLimiter>
    </section>
    {/* reviews */}
    <section className="bg-slate-600 py-10 relative">
      {/* width limiter */}
      <WidthLimiter>
        {/* title */}
        <div className="flex justify-center items-center">
          <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
            Reviews
          </h1>
        </div>

        {/* grid */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map(review => (
            <ReviewCard key={ review.sys.id } data={ review } />
          ))}
        </div>
      </WidthLimiter>
    </section>
    </> 
  )
}
