import React, { useState, useEffect } from "react";
import { Drawer, Button, Avatar } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import LoginForm from "./Reg&Log/LoginForm";
import ProfileForm from "./ProfileForm";
import TickerTape from "./TickerTape/TickerTape";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Charts", href: "/charts" },
  { name: "Converter", href: "/converter" },
  { name: "List of Crypto", href: "/cryptolist" },
  { name: "HeatMap", href: "/heatmap" },
  { name: "About", href: "/about" },
];

const defaultProfilePicture = "/default-profile-picture.png"; // Path to default profile picture

const Navbar = () => {
  const [modalActive, setModalActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileModalActive, setProfileModalActive] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const showModal = () => {
    setModalActive(true);
    setMobileMenuOpen(false);
  };

  const hideModal = () => {
    setModalActive(false);
  };

  const showProfileModal = () => {
    setProfileModalActive(true);
    setMobileMenuOpen(false);
  };

  const hideProfileModal = () => {
    setProfileModalActive(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-10"
              src="/bitcoin.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            className="bg-white text-gray-700 shadow-sm"
          />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-xl font-semibold leading-6 text-gray-900 no-underline">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Button type="link" onClick={showProfileModal} className="text-xl font-semibold leading-6 text-gray-900 inline-flex items-center border border-gray-300 shadow-md rounded-md px-4 py-2">
              {user.photoURL ? (
                <Avatar size={32} src={user.photoURL} />
              ) : (
                <img src={"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"} alt="Default Profile" className="w-8 h-8 rounded-full mr-2" />
              )}
              <span className="mr-1">Profile</span>
              <span aria-hidden="true" className="text-xl">&rarr;</span>
            </Button>
          ) : (
            <Button type="link" onClick={showModal} className="text-xl font-semibold leading-6 text-gray-900 inline-flex items-center border border-gray-300 shadow-md rounded-md px-4 py-2">
              <span className="mr-1">Enter Now</span>
              <span aria-hidden="true" className="text-xl">&rarr;</span>
            </Button>
          )}

          <LoginForm modalActive={modalActive} hideModal={hideModal} showModal={showModal} />
          <ProfileForm modalActive={profileModalActive} hideModal={hideProfileModal} />
        </div>
      </nav>
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined />}
        footer={
          <footer>
            <div className="flex flex-col items-center mt-4">
              {user ? (
                <>
                  <button onClick={showProfileModal} className="text-xl font-semibold leading-6 text-gray-900 inline-flex items-center border border-gray-300 shadow-md rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    {user.photoURL ? (
                      <Avatar size={32} src={user.photoURL} />
                    ) : (
                      <img src={"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"} alt="Default Profile" className="w-10 h-10 rounded-full mr-2" />
                    )}
                    Profile
                  </button>
                </>
              ) : (
                <button onClick={showModal} className="text-xl font-semibold leading-6 text-gray-900 inline-flex items-center border border-gray-300 shadow-md rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Enter Now
                </button>
              )}
            </div>
          </footer>
        }
      >
        <div className="flex items-center justify-between mb-6">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 no-underline"
            >
              {item.name}
            </a>
          ))}
        </div>
      </Drawer>
      <div id="tradingview-widget-container"><TickerTape /></div>
    </header>
  );
};

export default Navbar;

