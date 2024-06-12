// src/RegistrationForm.jsx
import React, { useState } from "react";
import { Modal as AntModal, Input, Form, Button, message } from "antd";
import el19 from "/Ellipse 19.svg";
import el21 from "/Ellipse 21.svg";
import el22 from "/Ellipse 22.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegistrationForm = ({ modalActive, hideModal }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    const { email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success("Registration successful!");
      hideModal();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntModal
      title="Registration"
      visible={modalActive}
      onCancel={hideModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleRegister}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Andrii_Kuchma" prefix={<img src={el19} alt="" className="ml-[19px] z-20" />} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email" }, { type: 'email', message: "Please enter a valid email" }]}
        >
          <Input placeholder="example@gmail.com" prefix={<img src={el19} alt="" className="ml-[19px] z-20" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="XXXXXXX" prefix={<img src={el21} alt="" className="ml-[19px] z-20" />} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password placeholder="sadfh321_Gd29" prefix={<img src={el22} alt="" className="ml-[19px] z-20" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </AntModal>
  );
};

export default RegistrationForm;
