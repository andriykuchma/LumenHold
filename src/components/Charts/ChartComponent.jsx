import React, { useEffect, useRef, memo } from 'react';
import './css/ChartWidget.css';

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center px-4 ">
        <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl sm:text-center">
          Crypto Charts
        </h1>
        <p className="mt-3 text-base md:text-lg lg:text-xl text-center text-slate-500">
         Graphical representations of cryptocurrency price movements.
        </p>
      </div>
      <div className="h-screen w-full flex items-center justify-center ">
        <div className="w-full h-full p-5">
          <div className="chart-widget-container" ref={container}>
            <div className="chart-widget-container__widget"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
