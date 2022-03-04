import Image from "next/image";
import Link from "next/link";
import CustomHead from '../components/CustomHead'
import WidthLimiter from "../components/WidthLimiter";

export default function Home() {
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

          {/*  */}
          <div className="w-full sm:w-1/2"></div>
        </div>
      </WidthLimiter>
    </section>
    </> 
  )
}
