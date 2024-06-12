import './style.css';
import React, { useState, useEffect } from 'react';
import { Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;

const CryptoConvert = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const [searchResultsFrom, setSearchResultsFrom] = useState([]);
  const [searchResultsTo, setSearchResultsTo] = useState([]);
  const [selectedFromCrypto, setSelectedFromCrypto] = useState(null);
  const [selectedToCrypto, setSelectedToCrypto] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false
          }
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSelectCurrencyFrom = (currency) => {
    setFromCurrency(currency.id);
    setSelectedFromCrypto(currency);
    setSearchResultsFrom([]);
  };

  const handleSelectCurrencyTo = (currency) => {
    setToCurrency(currency.id);
    setSelectedToCrypto(currency);
    setSearchResultsTo([]);
  };

  const handleConvert = () => {
    if (fromCurrency && toCurrency && amount) {
      const fromCrypto = cryptoData.find((crypto) => crypto.id === fromCurrency);
      const toCrypto = cryptoData.find((crypto) => crypto.id === toCurrency);

      if (fromCrypto && toCrypto) {
        const fromPrice = fromCrypto.current_price;
        const toPrice = toCrypto.current_price;

        // Convert amount from 'fromCurrency' to 'toCurrency'
        const convertedValue = (amount * fromPrice) / toPrice;

        // Round to 6 decimal places
        setConvertedAmount(convertedValue.toFixed(6));
      } else {
        setConvertedAmount('Invalid currencies');
      }
    } else {
      setConvertedAmount('');
    }
  };

  const handleSearchFrom = (value) => {
    setSearchResultsFrom(
      cryptoData.filter((crypto) =>
        crypto.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSearchTo = (value) => {
    setSearchResultsTo(
      cryptoData.filter((crypto) =>
        crypto.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="main p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between mb-4 items-end gap-5">
        <div className="flex-1 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromCurrency">
            From
          </label>
          {selectedFromCrypto && (
            <div className="flex items-center mb-2">
              <Avatar src={selectedFromCrypto.image} alt={selectedFromCrypto.name} size="small" className="mr-2" />
              <span>{selectedFromCrypto.name} ({selectedFromCrypto.symbol.toUpperCase()})</span>
            </div>
          )}
          <Search
            id="fromCurrency"
            placeholder="Search currency..."
            onSearch={handleSearchFrom}
            enterButton={<SearchOutlined />}
            className="w-full"
          />
          {searchResultsFrom.length > 0 && (
            <div className="absolute bg-white border border-gray-300 shadow-md mt-1 w-full max-h-48 overflow-y-auto z-10 rounded">
              <ul>
                {searchResultsFrom.map((crypto) => (
                  <li
                    key={crypto.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 flex items-center"
                    onClick={() => handleSelectCurrencyFrom(crypto)}
                  >
                    <Avatar src={crypto.image} alt={crypto.name} size="small" className="mr-2" />
                    <div>
                      <p>{crypto.name}</p>
                      <p className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex-1 mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0.00"
          />
        </div>
        <div className="flex-1 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toCurrency">
            To
          </label>
          {selectedToCrypto && (
            <div className="flex items-center mb-2">
              <Avatar src={selectedToCrypto.image} alt={selectedToCrypto.name} size="small" className="mr-2" />
              <span>{selectedToCrypto.name} ({selectedToCrypto.symbol.toUpperCase()})</span>
            </div>
          )}
          <Search
            id="toCurrency"
            placeholder="Search currency..."
            onSearch={handleSearchTo}
            enterButton={<SearchOutlined />}
            className="w-full"
          />
          {searchResultsTo.length > 0 && (
            <div className="absolute bg-white border border-gray-300 shadow-md mt-1 w-full max-h-48 overflow-y-auto z-10 rounded">
              <ul>
                {searchResultsTo.map((crypto) => (
                  <li
                    key={crypto.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 flex items-center"
                    onClick={() => handleSelectCurrencyTo(crypto)}
                  >
                    <Avatar src={crypto.image} alt={crypto.name} size="small" className="mr-2" />
                    <div>
                      <p>{crypto.name}</p>
                      <p className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Convert
      </button>
      {convertedAmount && (
        <div className="mt-4">
          <p>Converted Amount: {convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default CryptoConvert;
