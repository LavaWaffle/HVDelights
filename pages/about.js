import Image from "next/image";
import WidthLimiter from "../components/WidthLimiter";
import CustomHead from "../components/CustomHead";

export default function About() {
  return (
  <>
  <CustomHead title="HELLO"></CustomHead>
  <section className="bg-slate-500 py-10">
    {/* width limiter */}
    <WidthLimiter>
      {/* title */}
      <div className="flex justify-center items-center">
        <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
          About HV Delights
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center">
        {/* left */}
        <div className="flex flex-col w-full sm:w-1/2">
          <p className="text-violet-50 text-3xl text-center md:text-left pb-5">
            We here at HV Delights believe that all students deserve the ability to get nutricious food at an affordable price. We are independently run at Hopewell which allows us to make sure our customers are able to get the cousine they want!
          </p>

          <p className="text-violet-50 text-3xl text-center md:text-left">
            HV Delights is open from 9am to 5pm on weekdays and 7am to 10pm on weekends. If you want to have a party, delights can be bought in bulk. If you need enough to feed a family, a five pack of delights can be bought.
          </p>
        </div>

        {/* right */}
        <div className="flex justify-center sm:justify-end items-center w-full sm:w-1/2 mt-5 sm:mt-0">
          <div className="group relative sm:w-5/6 sm:h-5/6 overflow-hidden rounded-lg shadow-lg transition duration-200 ease-in-out">
            <div className="aspect-10/9 w-full object-cover overflow-hidden transition duration-200 ease-in-out group-hover:scale-110 group-hover:blur-[5px]">
              <Image 
                src="/LOREM.jpg"
                height="2547"
                width="2547"  
              />
            </div>
            <div className="absolute inset-0 text-4xl text-teal-700 text-bold p-4 bg-white flex justify-center items-center transition duration-200 ease-in-out opacity-0 group-hover:opacity-50">
              Mushroom Soup
            </div>
          </div>
        </div>
      </div>
    </WidthLimiter>
  </section>
  </>
  )
}