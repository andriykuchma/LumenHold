import React, { useState } from "react";
import { Button } from "antd";
import LoginForm from "../../components/Reg&Log/LoginForm"; // Import the LoginForm component
import './css/home.css';

const Home = () => {
    const [loginModalVisible, setLoginModalVisible] = useState(false);

    const showLoginModal = () => {
        setLoginModalVisible(true);
    };

    const hideLoginModal = () => {
        setLoginModalVisible(false);
    };

    return (
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative flex flex-col items-center sm:flex-row sm:items-center justify-center">
        <div className="text-center mb-6 sm:mb-0 sm:mr-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                LumenHold
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                "LumenHold: Your Trusted Crypto Wallet for Safeguarding and Managing Your Digital Assets with Ease."
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-x-6">
                <Button type="primary" size="large" className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" onClick={showLoginModal}>
                    Get started
                </Button>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900 no-underline mt-3 sm:mt-0">
                    Learn more <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
        <img className="img1 mt-6 sm:mt-0" src="/s-left.png" alt="" />
    </div>
            // <LoginForm modalActive={loginModalVisible} hideModal={hideLoginModal} />
    );
};

export default Home;
