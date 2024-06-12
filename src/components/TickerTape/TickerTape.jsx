import React, { useEffect } from "react";
import "./css/TickerTape.css";

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "Ethereum"
        },
        {
          "description": "Solana",
          "proName": "BINANCE:SOLUSDT"
        }
      ],
      "showSymbolLogo": true,
      "isTransparent": false,
      "displayMode": "adaptive",
      "colorTheme": "dark",
      "locale": "en"
    });

    const tradingViewContainer = document.getElementById("tradingview-widget-container");
    tradingViewContainer.appendChild(script);

    return () => {
      tradingViewContainer.removeChild(script);
    };
  }, []);

  return (
    <div id="tickertape-widget-container" className="tickertape-widget-container ">
      <div className="tickertape-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
