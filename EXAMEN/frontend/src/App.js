import './App.css';
import TabelArticole from './components/Articole';
import FormularArticol from "./components/FormularArticol";
import TabelReferinte from './components/Referinte';
import FormularReferinta from "./components/FormularReferinta";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TabelArticole />} />
          <Route path="/formularArticol" element={<FormularArticol />} />
          <Route path="/referinte" element={<TabelReferinte />} />
          <Route path="/formularReferinta" element={<FormularReferinta />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
