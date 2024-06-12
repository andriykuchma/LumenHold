import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Charts from "../pages/Charts/Charts.jsx";
import HeatMap from "../pages/HeatMap/HeatMap.jsx";
import  Table  from "../pages/CryptoList/CryptoList";
import Converter from "../pages/Convert/Convert.jsx"



const AppRouter = () => {
    return (
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/converter" element={<Converter />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/cryptolist" element={<Table />} />
            <Route path="/heatmap" element={<HeatMap />} />
            
            

        </Routes>
    );
};

export default AppRouter;
