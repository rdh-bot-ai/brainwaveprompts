import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const cell = (ok: boolean, note?: string) => (
  <td className="py-3 text-center align-middle whitespace-nowrap">
    {ok ? <Check className="inline h-4 w-4 text-green-600 dark:text-green-500" /> : <X className="inline h-4 w-4 text-red-500" />}<br />
    {note && <span className="text-xs text-muted-foreground">{note}</span>}
  </td>
);

export default function ComparisonTable() {
  return (
    <section className="w-full px-4 py-12 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose <span className="text-primary">Brainwave Prompt</span>?</h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
          <table className="min-w-[780px] w-full text-sm bg-white dark:bg-slate-900">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="sticky left-0 z-10 py-4 px-4 bg-inherit font-medium text-left">Feature</th>
                {["Brainwave Premium $18","AIPRM Pro $33","FlowGPT Lite $50","PromptLayer Pro $50","Jasper Creator $39"].map((h,i)=>(
                  <th key={h} className={clsx("py-4 px-4 font-medium", i===0 && "bg-primary/5 dark:bg-primary/10")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="sticky left-0 bg-inherit py-3 px-4 font-medium">Unlimited enhancements</td>
                {cell(true)}{cell(false,"credits")}{cell(false,"tokens")}{cell(true)}{cell(true,"word‑cap")}
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="sticky left-0 bg-inherit py-3 px-4 font-medium">GPT‑4‑o access</td>
                {cell(true)}{cell(false)}{cell(false)}{cell(false)}{cell(false)}
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="sticky left-0 bg-inherit py-3 px-4 font-medium">Dynamic template editor</td>
                {cell(true)}{cell(false,"limited")}{cell(true)}{cell(true)}{cell(false)}
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="sticky left-0 bg-inherit py-3 px-4 font-medium">PDF & URL summariser</td>
                {cell(true)}{cell(false)}{cell(false)}{cell(false)}{cell(false)}
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="sticky left-0 bg-inherit py-3 px-4 font-medium">Price (solo user)</td>
                <td className="py-3 text-center font-semibold text-primary">$18</td>
                <td className="py-3 text-center">$33</td>
                <td className="py-3 text-center">$50</td>
                <td className="py-3 text-center">$50</td>
                <td className="py-3 text-center">$39</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl shadow-inner">
          <h3 className="text-xl font-semibold">Ready to level‑up your prompts?</h3>
          <Button asChild size="lg" className="px-6 py-4 text-base">
            <a href="/signup?plan=premium" className="flex items-center gap-2">
              Unlock Premium • $18/mo <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}