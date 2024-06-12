import { useState, useEffect } from "react";
import { Input, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { searchCoins } from "../../api/main-api";
import { CoinInformation } from "./CoinData";

const { Search } = Input;

const CoinDetailsButton = ({ coinId, children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(!dialogOpen);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <CoinInformation
        isOpen={dialogOpen}
        handler={handleOpen}
        coinId={coinId}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      />
    </>
  );
};

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        const results = await searchCoins(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    };

    const searchTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  return (
    <div className="mb-4 flex flex-col justify-center md:flex-row md:items-center mx-5 items-center relative">
      <div className="flex w-full md:w-6/12 lg:w-5/12 xl:w-4/12 gap-2">
        <Search
          placeholder="Search..."
          onSearch={value => setSearchTerm(value)}
          enterButton={<SearchOutlined />}
          className="w-full"
        />

        {searchResults.length > 0 && (
          <div className="absolute bg-white border border-gray-300 shadow-md mt-11 w-full md:w-6/12 lg:w-5/12 xl:w-4/12 max-h-48 overflow-y-auto z-10 rounded">
            <ul>
              {searchResults.map((result) => (
                <CoinDetailsButton coinId={result.id} key={result.id}>
                  <li key={result.id} className="cursor-pointer hover:bg-gray-100 p-2 flex items-center">
                    <Avatar src={result.large} alt={result.name} size="small" className="mr-2" />
                    <div>
                      <p>{result.name}</p>
                      <p className="text-gray-500 text-sm">{result.symbol}</p>
                    </div>
                  </li>
                </CoinDetailsButton>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
