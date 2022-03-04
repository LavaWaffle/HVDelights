export default function ReviewCard({ data }) {
  const { reviewText, author } = data.fields
  
  return (
    <blockquote className="bg-slate-500 p-5 rounded border-2 border-slate-400">
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