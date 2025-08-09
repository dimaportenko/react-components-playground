import "./index.css";
import { GsapGallery } from "./components/GsapGallery";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10">
      <h1 className="text-4xl font-bold mb-6">Slider Gallery</h1>

      <GsapGallery />
    </div>
  );
}

export default App;
