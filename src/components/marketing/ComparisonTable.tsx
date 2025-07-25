import { Check, X } from "lucide-react";

export default function ComparisonTable() {
  const cell = (ok: boolean, note?: string) =>
    <td className="py-3 text-center">
      {ok ? <Check className="inline h-4 w-4 text-green-600" /> :
            <X className="inline h-4 w-4 text-red-500" />}<br/>
      {note && <span className="text-xs text-gray-500">{note}</span>}
    </td>;

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Why choose Brainwave Prompt?</h2>
      <table className="min-w-[720px] w-full text-sm border-collapse">
        <thead className="bg-gray-50">
          <tr className="border-b">
            <th className="py-3 px-4 text-left">Feature</th>
            <th className="py-3 px-4 text-center">Brainwave&nbsp;Premium<br/><span className="font-normal">$18</span></th>
            <th className="py-3 px-4 text-center">AIPRM&nbsp;Pro<br/>$33</th>
            <th className="py-3 px-4 text-center">FlowGPT&nbsp;Pro&nbsp;Lite<br/>$50</th>
            <th className="py-3 px-4 text-center">PromptLayer&nbsp;Pro<br/>$50</th>
            <th className="py-3 px-4 text-center">Jasper&nbsp;Creator<br/>$39</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4">Unlimited enhancements / usage</td>
            {cell(true)}
            {cell(false, "credit‑based")}
            {cell(false, "Flux tokens")}
            {cell(true)}
            {cell(true, "word‑count cap")}
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4">GPT‑4‑o access</td>
            {cell(true)}
            {cell(false)}
            {cell(false)}
            {cell(false)}
            {cell(false)}
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4">Dynamic template editor</td>
            {cell(true)}
            {cell(false, "limited")}
            {cell(true)}
            {cell(true)}
            {cell(false)}
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4">Built‑in PDF & URL summariser</td>
            {cell(true)}
            {cell(false)}
            {cell(false)}
            {cell(false)}
            {cell(false)}
          </tr>
          <tr>
            <td className="py-3 px-4">Price per solo user</td>
            <td className="py-3 text-center font-semibold">$18</td>
            <td className="py-3 text-center">$33</td>
            <td className="py-3 text-center">$50</td>
            <td className="py-3 text-center">$50</td>
            <td className="py-3 text-center">$39</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}