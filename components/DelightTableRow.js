export default function DelightTableRow({ data, sm }) {
  const {title, quantity, price} = data
  return (
    <tr className="border-b-[2px] border-slate-500 even:bg-neutral-400 even:hover:bg-neutral-300 odd:bg-stone-400 odd:hover:bg-stone-300 even:text-gray-50 odd:text-zinc-50">
      <td className={sm ? "py-[0.25rem] px-2 text-center" : "py-[0.25rem] px-2"}>
        {title}
      </td>
      <td className={sm ? "py-[0.25rem] px-2 text-center" : "py-[0.25rem] px-2"}>
        {quantity}
      </td>
      <td className={sm ? "py-[0.25rem] px-2 text-center" : "py-[0.25rem] px-2"}>
        ${price}
      </td>
    </tr>
  )
}