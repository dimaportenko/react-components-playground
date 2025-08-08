import "./index.css";
import { DemoCard } from "./components/DemoCard";

type DemoCardData = {
  id: number;
  title: string;
  description: string;
};

const demoCards: DemoCardData[] = Array.from({ length: 10 }, (_, index) => {
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
          <DemoCard key={card.id} id={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
}

export default App;
