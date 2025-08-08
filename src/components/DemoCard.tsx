import React from "react";

export type DemoCardProps = {
  id: number;
  title: string;
  description: string;
};

export function DemoCard({ id, title, description }: DemoCardProps) {
  return (
    <article className="rounded-2xl border-2 border-[#fbf0df]/30 bg-[#1a1a1a]/60 backdrop-blur-sm overflow-hidden hover:border-[#f3d5a3] transition-colors duration-200">
      <div className="aspect-[16/10] bg-gradient-to-br from-[#f3d5a3] to-[#fbf0df] text-[#1a1a1a] flex items-center justify-center text-3xl font-extrabold">
        {id}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-white/80 leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
