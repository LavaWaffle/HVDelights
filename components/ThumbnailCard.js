import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


export default function ThumbnailCard({ data }) {
  const { title, slug, thumbnail, grayThumbnail } = data.fields

  const [ img, setImg ] = useState(`https:${ thumbnail.fields.file.url }`)
  const handleEnter = () => {
    setImg(`https:${ grayThumbnail.fields.file.url }`)
  }
  const handleLeave = () => {
    setImg(`https:${ thumbnail.fields.file.url }`)
  }
  return (
    <Link href={slug}><a onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="group bg-red-400 hover:bg-red-300 rounded-xl p-3 hover:-translate-y-1 transition">
      <h2 className="text-center font-rubik text-2xl text-amber-50 group-hover:text-amber-200 transition">{ title }</h2>
      <div className="h-32 rounded-lg overflow-hidden border-2 border-amber-50 hover:border-amber-200 transition ease-in-out">
        <Image 
          id={data.sys.id}
          src={img}
          width="110"
          height="125"
        />
      </div>
    </a></Link>
  )
}