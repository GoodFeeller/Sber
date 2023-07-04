import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Home} from "./home/Home.jsx";
import DBRequestConstructor from "./db-request-constructor/DBRequestConstructor.jsx";
import Levels from "./levels/Levels.jsx";
export const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/db-constructor' element={<DBRequestConstructor/>}/>
            <Route path='/levels' element={<Levels/>}/>
            <Route path='*' element={<div>Page not found</div>}/>
        </Routes>
    </BrowserRouter>
}