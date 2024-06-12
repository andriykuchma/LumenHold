
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer/Footer';


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
          <div className="relative isolate px-3 md:px-6 pt-14 lg:px-8 ">
            <AppRouter/>
          </div>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
