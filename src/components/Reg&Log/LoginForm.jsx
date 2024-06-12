// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Modal as AntModal, Input, Form, Button, message } from "antd";
import RegistrationForm from "./RegistrationForm"; // Import RegistrationForm component
import el19 from "/Ellipse 19.svg";
import frame from "/Frame.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebaseConfig'; // Ensure this path is correct

const LoginForm = ({ modalActive, hideModal }) => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUpClick = () => {
    setShowRegistrationForm(true);
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User Info: ', user);
        hideModal();
      })
      .catch((error) => {
        console.error('Error: ', error);
        message.error(error.message);
      });
  };

  const handleEmailLogin = (values) => {
    const { email, password } = values;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User Info: ', user);
        hideModal();
        message.success("Login successful!");
      })
      .catch((error) => {
        console.error('Error: ', error);
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AntModal title="Login" visible={modalActive} onCancel={hideModal} footer={null}>
      <Form layout="vertical" onFinish={handleEmailLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Enter your email" prefix={<img src={el19} alt="" className="ml-[19px] z-20" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" prefix={<img src={el19} alt="" className="ml-[19px] z-20" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log in
          </Button>
        </Form.Item>
        <div className="text-center">
          <span className="text-[#454380] text-[22px] font-semibold">
            Don't have an account?
          </span>
          <img src={frame} alt="logo" className="mx-2" />
          <Button onClick={handleSignUpClick}><span className="font-bold">Sign Up</span></Button>
        </div>
        <div className="text-center mt-4">
          <Button type="default" onClick={handleGoogleLogin}>
            Login with Google
          </Button>
        </div>
      </Form>

      {showRegistrationForm && <RegistrationForm modalActive={true} hideModal={() => setShowRegistrationForm(false)} />}
    </AntModal>
  );
};

export default LoginForm;
