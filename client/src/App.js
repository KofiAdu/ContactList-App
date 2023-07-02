import { Routes, Route } from 'react-router-dom'
import Add from './components/Add';
import Home from './components/Home';
import Edit from './components/Edit';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
