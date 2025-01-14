import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './App.css'
import MoviesPage from "./pages/movies/MoviesPage"
import GlobalContext from "../../context/globalContext"
import { useState } from "react"

function App() {

  const [isLoading, setIsLoading] = useState(false)

  return (
   <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path="/movies/:id" element={<MoviesPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </GlobalContext.Provider>
  )
}

export default App