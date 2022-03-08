export default function DelightTableRowEmpty() {
  return (
    <tr className="border-b-[2px] border-slate-500 even:bg-neutral-400 even:hover:bg-neutral-300 odd:bg-stone-400 odd:hover:bg-stone-300 even:text-gray-50 odd:text-zinc-50">
      <td className="py-[0.25rem] px-2 text-center" colSpan="3">
        Cart is empty
      </td>
    </tr>
  )
}