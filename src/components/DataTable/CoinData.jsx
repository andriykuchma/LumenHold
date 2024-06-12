import PropTypes from "prop-types";
import { Modal, Typography, Avatar, Spin } from "antd";
import { useEffect, useState } from "react";
import { getCoinInfo } from "../../api/main-api";
import { percentageValue } from "../../api/utils";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { CiLink } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const { Title, Text } = Typography;

export function CoinInformation({ isOpen, handler, coinId }) {
  const [coinInfo, setCoinInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinInfo = async () => {
      try {
        const coinData = await getCoinInfo(coinId);
        setCoinInfo(coinData);
      } catch (error) {
        console.error("Error fetching coin information:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && coinId) {
      setLoading(true);
      fetchCoinInfo();
    }
  }, [isOpen, coinId]);

  return (
    <Modal
      visible={isOpen}
      onCancel={handler}
      className="w-full max-w-md"
      footer={null}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full gap-2 py-4">
          <Title level={4} className="font-bold">
            Loading...
          </Title>
          <Spin size="small" />
        </div>
      ) : coinInfo ? (
        <>
          <div className="flex flex-col items-center bg-gray-100 p-4">
            <div className="flex flex-row gap-3 items-center">
              <Avatar
                src={coinInfo.image}
                alt={coinInfo.name}
                size={48}
                className="bg-gray-50 object-contain p-1 shadow-sm"
              />
              <div className="flex flex-col items-center">
                <Title level={4} className="font-bold m-0">
                  {coinInfo.name}
                </Title>
                <div className="flex items-center gap-1 mt-1">
                  <div className="rounded-full bg-gray-600 px-2">
                    <Text strong className="text-white font-medium">
                      {coinInfo.symbol}
                    </Text>
                  </div>
                  <div className="rounded-full bg-gray-500 px-2">
                    <Text strong className="text-white font-medium">
                      #{coinInfo.rank}
                    </Text>
                  </div>
                  <div className="rounded-full bg-lime-600 px-2">
                    <a href={coinInfo.linkHome}>
                      <Text strong className="text-white font-medium cursor-pointer flex gap-1">
                        Website <CiLink className="text-xl" />
                      </Text>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4 text-center">
              <div className="flex items-center gap-2">
                <Title level={3} className="font-bold text-xl">
                  $ {coinInfo.price || 0}
                </Title>
                <div className="flex items-center">
                  <Text
                    strong
                    className="font-medium text-sm"
                    style={percentageValue(coinInfo.price24h)}
                  >
                    {coinInfo.price24h || 0}
                  </Text>
                  {percentageValue(coinInfo.price24h).color === "red" ? (
                    <CaretDownOutlined className="text-red-500 ml-1 text-sm" />
                  ) : (
                    <CaretUpOutlined className="text-green-500 ml-1 text-sm" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Text strong className="font-medium text-sm">
                  ATH: $ {coinInfo.ath || "$ 0"}
                </Text>
                <div className="flex items-center">
                  <Text
                    strong
                    className="font-medium text-sm"
                    style={percentageValue(coinInfo.athChange)}
                  >
                    {coinInfo.athChange || 0}
                  </Text>
                  {percentageValue(coinInfo.athChange).color === "red" ? (
                    <CaretDownOutlined className="text-red-500 ml-1 text-sm" />
                  ) : (
                    <CaretUpOutlined className="text-green-500 ml-1 text-sm" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-zinc-600 text-white px-4 py-2">
            <div className="flex flex-col gap-2">
              <Text className="text-sm font-medium">
                Circulating Supply: <span className="font-normal">{coinInfo.totalSupply}</span>
              </Text>
              <Text className="text-sm font-medium">
                Max Supply: <span className="font-normal">{coinInfo.maxSupply}</span>
              </Text>
              <Text className="text-sm font-medium flex items-center gap-1">
                Users Watchlist: <span className="font-normal">{coinInfo.userWatchlist}</span> <FaStar className="text-sm" />
              </Text>
            </div>
          </div>
        </>
      ) : null}
    </Modal>
  );
}

// PropTypes definition for the CoinInformation component.
CoinInformation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  coinId: PropTypes.string,
};
