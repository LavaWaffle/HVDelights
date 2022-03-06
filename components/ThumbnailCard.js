import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ThumbnailCard({ data, scale }) {
  // grabs data from prop
  const { title, slug, thumbnail, grayThumbnail } = data.fields
  
  // sets default states of img src
  const [ img, setImg ] = useState(`https:${ thumbnail.fields.file.url }`)
  // handles state of img src when mouse enters the card 
  const handleEnter = () => {
    // sets img to gray version
    setImg(`https:${ grayThumbnail.fields.file.url }`)
  }
  // handles state of img src when mouse leaves the card
  const handleLeave = () => {
    // sets img to color version
    setImg(`https:${ thumbnail.fields.file.url }`)
  }

  return (
    <Link href={`/delights/${slug}`}><a onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="group bg-red-400 hover:bg-red-300 rounded-xl p-3 hover:-translate-y-1 transition">
      <h2 className="text-center font-rubik text-2xl text-amber-50 group-hover:text-amber-200 transition">{ title }</h2>
      <div className={ scale ? "h-44 w-44 rounded-lg overflow-hidden border-2 border-amber-50 hover:border-amber-200 transition ease-in-out" : "h-32 w-32 rounded-lg overflow-hidden border-2 border-amber-50 hover:border-amber-200 transition ease-in-out"}>
        <Image 
          id={data.sys.id}
          src={img}
          alt={title}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          layout="responsive"
        />
      </div>
    </a></Link>
  )
}