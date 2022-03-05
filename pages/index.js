import Image from "next/image";
import CustomHead from '../components/CustomHead'
import WidthLimiter from "../components/WidthLimiter";
import { createClient } from 'contentful'
import ThumbnailCard from "../components/ThumbnailCard";
import ReviewCard from "../components/ReviewCard";

export async function getStaticProps() {
  const client = createClient({ 
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  
  const thumbRes = await client.getEntries({
    content_type: 'thumbnails',
  })

  const revRes = await client.getEntries({
    content_type: 'reviews',
  })

  return {
    props: {
      thumbnails: thumbRes.items,
      reviews: revRes.items,
    },
    revalidate: 1,
  }
}

export default function Home({ thumbnails, reviews }) {
  return (
    <>
    <CustomHead title="HVDelights - Home" />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        {/* flex */}
        <div className="flex flex-col sm:flex-row space-y-10 sm:space-y-0">
          {/* left */}
          <div className="inline-flex flex-col items-center w-full sm:w-1/2">
            <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">Healthy and Delicious Food</h1>
            <div className="aspect-4000/4250 object-cover rounded-lg shadow-xl overflow-hidden">
              <Image 
                src="/salad-min.jpg"
                alt="Healthy Salad"
                width="4000"
                height="4250"
              />
            </div>
          </div>
          {/* right */}
          <div className="inline-flex flex-col items-center w-full sm:w-1/2">
            <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">Delightful Cuisine</h1>
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
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
        
        {/* open quote */}
        <div className="before:content-['\201c'] before:absolute before:-top-[6%] before:left-[2%] before:text-slate-300 before:text-[250px] before:font-serif">
        </div>
        {/* close quote */}
        <div className="before:content-['\201c'] before:absolute before:-bottom-[10%] sm:before:-bottom-[13%] before:right-[1%] before:text-slate-300 before:text-[250px] before:font-serif before:rotate-180">
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
