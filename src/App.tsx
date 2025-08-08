import "./index.css";

type DemoCard = {
  id: number;
  title: string;
  description: string;
};

const demoCards: DemoCard[] = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Demo Card ${id}`,
    description:
      "This is placeholder content for the gallery card. Replace with real data later.",
  };
});

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10">
      <h1 className="text-4xl font-bold mb-6">Slider Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {demoCards.map(card => (
          <article
            key={card.id}
            className="rounded-2xl border-2 border-[#fbf0df]/30 bg-[#1a1a1a]/60 backdrop-blur-sm overflow-hidden hover:border-[#f3d5a3] transition-colors duration-200"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-[#f3d5a3] to-[#fbf0df] text-[#1a1a1a] flex items-center justify-center text-3xl font-extrabold">
              {card.id}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm text-white/80 leading-relaxed">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
