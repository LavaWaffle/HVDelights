export default function ReviewCard({ data }) {
  // grabs data from prop
  const { reviewText, author } = data.fields
  
  return (
    <blockquote className="bg-slate-500 p-5 rounded border-2 border-slate-400 first:before:content-['\201c'] last:after:content-['\201c'] first:before:absolute last:after:absolute first:before:-top-9 last:after:-bottom-[94px] first:before:-left-2 last:after:right-2 first:before:text-slate-300 last:after:text-slate-300 first:before:text-[250px] last:after:text-[250px] first:before:font-serif last:after:font-serif last:after:rotate-180">
      <div className="h-full flex flex-col justify-between">
        {/* review */}
        <p className="text-slate-100 text-2xl italic">
          { reviewText }
        </p>
        {/* author */}
        <p className="text-amber-100 text-2xl text-bold text-right before:content-['\2014\0020']">
          { author }
        </p>
      </div>
    </blockquote>
  )
}