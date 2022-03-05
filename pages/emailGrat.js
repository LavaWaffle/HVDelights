import { createClient } from "contentful";
import CustomHead from "../components/CustomHead";
import ThumbnailCard from "../components/ThumbnailCard";
import WidthLimiter from "../components/WidthLimiter";

export async function getStaticProps() {
  const client = createClient({ 
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  
  const thumbRes = await client.getEntries({
    content_type: 'thumbnails',
  })

  return {
    props: {
      thumbnails: thumbRes.items,
    },
    revalidate: 1,
  }
}

export default function emailGrat({ thumbnails }) {
  return (
    <>
    <CustomHead title="HV Delights - Thanks" />
    <section className="bg-slate-500 py-10">
      {/* width limiter */}
      <WidthLimiter>
        <div className="rounded-lg shadow-lg px-5 py-3 bg-red-400">
          <h1 className="text-amber-50 text-3xl">
            Thank you for joining the email list!
          </h1>
          <h5 className="text-amber-300 text-2xl mt-2">
            You will be contacted weekly about new delights and deals!
          </h5>
        </div>

        <div className="flex justify-center items-center">
          <h1 className="text-amber-400 font-title text-4xl text-center font-bold mt-4 mb-3">
            Delightful Cuisine
          </h1>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          {thumbnails.map(thumbnail => (
            <ThumbnailCard key={ thumbnail.sys.id } data={ thumbnail } scale={true}/>
          ))}
        </div>
      </WidthLimiter>
    </section>
    </>
  )
}