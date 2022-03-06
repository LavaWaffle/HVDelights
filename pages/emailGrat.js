import { createClient } from "contentful";
import CustomHead from "../components/CustomHead";
import ThumbnailCard from "../components/ThumbnailCard";
import WidthLimiter from "../components/WidthLimiter";

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

  // returns the data as props to the element
  return {
    props: {
      thumbnails: thumbRes.items,
    },
    // check for updates to data 1 second after page is loaded
    revalidate: 1,
  }
}

export default function emailGrat({ thumbnails }) {
  return (
    <>
    {/* page name */}
    <CustomHead title="HV Delights - Thanks" />
    {/* hero */}
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        {/* card */}
        <div className="rounded-lg shadow-lg px-5 py-3 bg-red-400">
          {/* card title */}
          <h1 className="text-amber-50 text-3xl">
            Thank you for joining the email list!
          </h1>
          {/* card sub title */}
          <h5 className="text-amber-300 text-2xl mt-2">
            You will be contacted weekly about new delights and deals!
          </h5>
        </div>
        {/* sub title  */}
        <div className="flex justify-center items-center">
          <h1 className="text-amber-400 font-title text-4xl text-center font-bold mt-4 mb-3">
            Delightful Cuisine
          </h1>
        </div>
        {/* flex */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          {/* thumbnail cards */}
          {thumbnails.map(thumbnail => (
            <ThumbnailCard key={ thumbnail.sys.id } data={ thumbnail } scale={true}/>
          ))}
        </div>
      </WidthLimiter>
    </section>
    </>
  )
}