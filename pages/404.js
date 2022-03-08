import CustomHead from '../components/CustomHead'
import WidthLimiter from '../components/WidthLimiter'
import Link from "next/link"
import { useEffect } from 'react'
import Router from "next/router";


export default function NotFound() {
  useEffect(() => {
    setTimeout(() => {
      Router.push('/')
    }, 4000)
  }, [])
  return (
  <>
  {/* page name */}
  <CustomHead title="HV Delights - Not Found" />
  {/* hero */}
  <section className="bg-slate-500 py-10">
    {/* width limiter */}
    <WidthLimiter>
      {/* title */}
      <div className="flex justify-center items-center">
        <h1 className="text-amber-400 font-title text-4xl text-center font-bold mb-3">
          Page Not Found
        </h1>
      </div>
      {/* flex */}
      <div className="flex flex-col sm:flex-row grow shrink basis-auto justify-center items-center gap-10 text-amber-200">
      <h1 className="text-9xl font-bold">404</h1>
      <div>
        <h2 className="text-center sm:text-left">Ooops! That page cannot be found D:</h2>
        <p className="text-center sm:text-left">Redirecting to <Link href="/"><a className="text-cyan-400 underline mb-10">Homepage</a></Link> for more delightful goodness...</p>
      </div>
      </div>
    </WidthLimiter>
  </section>
  </>
  )
}