import { Card, Typography, Avatar } from "antd";
import { getCoinsList } from "../../api/main-api";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdOutlineManageSearch } from "react-icons/md";
import { CoinInformation } from "./CoinData";
import { percentageValue } from "../../api/utils";
import { SearchComponent } from "./Search";
import { Spin } from "antd";

const { Meta } = Card;

const TABLE_HEAD = [
  "Rank",
  "Crypto",
  "Price",
  "1h",
  "24h",
  "7d",
  "MarketCap",
  "See More",
];

const CoinDetailsButton = ({ coinId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(!dialogOpen);

  return (
    <>
      <MdOutlineManageSearch
        className="text-slate-50 text-3xl bg-zinc-600 rounded-3xl p-1 cursor-pointer hover:scale-110"
        onClick={handleOpen}
      />
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

export const Table = ({ name }) => {
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coinsList = await getCoinsList();
        setCoinsData(coinsList);
      } catch (error) {
        console.error("Error fetching coins list:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 0.6 } },
  };
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id={name} className="py-10 mt-20">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="flex flex-col items-center justify-center px-4 mb-6">
          <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl sm:text-center">
            List of Crypto
          </h1>
          <p className="mt-3 text-base md:text-lg lg:text-xl text-center text-slate-500">
            See the most important assets across the market
          </p>
        </div>

        <SearchComponent />

        <div className="flex justify-center items-center mx-2 md:mx-5 mt-5">
          {loading ? (
            <Card className="w-full xl:w-4/5">
              <div className="flex items-center justify-center h-full gap-4 py-64">
                <Typography.Text
                  className="font-bold"
                >
                  Loading...
                </Typography.Text>
                <Spin size="large" />
              </div>
            </Card>
          ) : (
            <Card className="w-full xl:w-4/5 shadow-xl">
              <div className="overflow-auto scrollbar-thin">
                <table className="w-full min-w-max table-auto text-left overflow-hidden">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="p-2 md:p-4">
                          <Typography.Text
                            className="font-bold leading-none opacity-70"
                          >
                            {head}
                          </Typography.Text>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coinsData.map((coin) => (
                      <tr key={coin.name} className="text-xs md:text-sm">
                        <td className="p-2 md:p-4">
                          <Typography.Text
                            className="font-light"
                          >
                            {coin.rank}
                          </Typography.Text>
                        </td>
                        <td className="p-2 md:p-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={coin.image}
                              alt={coin.name}
                              size={32}
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography.Text
                              className="font-medium"
                            >
                              {coin.name}
                            </Typography.Text>
                          </div>
                        </td>
                        <td className="p-2 md:p-4">
                          <Typography.Text
                            className="font-medium"
                          >
                            {coin.currentPrice}
                          </Typography.Text>
                        </td>
                        <td className="p-2 md:p-4">
                          <Typography.Text
                            style={percentageValue(
                              coin.priceChangePercentage1h
                            )}
                            className="font-medium"
                          >
                            {coin.priceChangePercentage1h}
                          </Typography.Text>
                        </td>
                        <td className="p-2 md:p-4">
                          <Typography.Text
                            style={percentageValue(
                              coin.priceChangePercentage24h
                            )}
                            className="font-medium"
                          >
                            {coin.priceChangePercentage24h}
                          </Typography.Text>
                        </td>
                        <td className="p-2 md:p-4">
                          <Typography.Text
                            style={percentageValue(
                              coin.priceChangePercentage7d
                            )}
                            className="font-medium"
                          >
                            {coin.priceChangePercentage7d}
                          </Typography.Text>
                        </td>
                        <td className="p-2 md:p-4">
                          <Typography.Text
                            className="font-medium"
                          >
                            {coin.marketcap}
                          </Typography.Text>
                        </td>
                        <td className="p-2 md:p-4">
                          <CoinDetailsButton coinId={coin.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </motion.div>
    </section>
  );
};
