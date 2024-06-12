// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import './css/HeatMap.css';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (

    <div className="container">
      <div className="flex flex-col items-center justify-center px-4 ">
        <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl sm:text-center">
          Crypto HeatMap
        </h1>
        <p className="mt-3 text-base md:text-lg lg:text-xl text-center text-slate-500">
          Visual representation of cryptocurrency performance trends.
        </p>
      </div>
      <div className="h-screen w-full flex items-center justify-center ">
        <div className="w-full h-full">
          <div className="heatmap-widget-container" ref={container}>
            <div className="heatmap-widget-container__widget"></div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default memo(TradingViewWidget);
