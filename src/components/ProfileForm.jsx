import React, { useEffect, useState } from "react";
import { Modal as AntModal, Button, Form, Input, Spin, Avatar, message } from "antd";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";

const ProfileForm = ({ modalActive, hideModal }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      form.setFieldsValue({
        username: currentUser.displayName || "",
        email: currentUser.email || "",
      });
      console.log('User:', currentUser); // Log the user info
      console.log('User photo URL:', currentUser.photoURL); // Log the photo URL
      setFormLoading(false);
    }
  }, [modalActive, form]);

  const handleUpdateProfile = (values) => {
    setLoading(true);
    const { username } = values;
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      updateProfile(currentUser, { displayName: username })
        .then(() => {
          setUser({ ...currentUser, displayName: username });
          hideModal();
          // Optionally show a success message
        })
        .catch((error) => {
          console.error('Error updating profile: ', error);
          // Optionally show an error message
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        hideModal();
        window.location.reload(); // Refresh the page
        // Optionally show a success message
      })
      .catch((error) => {
        console.error('Error logging out: ', error);
        // Optionally show an error message
      });
  };

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log('Ethereum successfully detected!');
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        message.success(`Wallet connected: ${accounts[0]}`);
        await fetchBalances(accounts[0]);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        message.error('Failed to connect wallet.');
      }
    } else {
      console.error('Please install MetaMask!');
      message.error('MetaMask not detected. Please install MetaMask.');
    }
  };

  const fetchBalances = async (account) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const ethBalance = await provider.getBalance(account);
      setEthBalance(ethers.utils.formatEther(ethBalance));

      // Token balances (You can add more token contract addresses and ABIs as needed)
      const tokenAddresses = [
        // Example token contract addresses
        // '0xTokenContractAddress1',
        // '0xTokenContractAddress2',
      ];

      const tokenABI = [
        // Minimal ERC-20 ABI to get the balance
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
      ];

      const balances = await Promise.all(tokenAddresses.map(async (tokenAddress) => {
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const balance = await tokenContract.balanceOf(account);
        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        return {
          symbol,
          balance: ethers.utils.formatUnits(balance, decimals),
        };
      }));

      setTokenBalances(balances);
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  return (
    <AntModal title="Profile" visible={modalActive} onCancel={hideModal} footer={null}>
      {formLoading ? (
        <Spin />
      ) : (
        <>
          {user && user.photoURL && (
            <div className="flex justify-center mb-4">
              <Avatar size={64} src={user.photoURL} />
            </div>
          )}

          <Form layout="vertical" form={form} onFinish={handleUpdateProfile}>
            <Form.Item label="Username" name="username" required>
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input value={user ? user.email : ""} disabled />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Update Profile
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" block onClick={handleLogout}>
                Log Out
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" block onClick={connectWallet}>
                Connect MetaMask Wallet
              </Button>
            </Form.Item>
            {walletAddress && (
              <Form.Item>
                <p>Connected Wallet: {walletAddress}</p>
                <p>ETH Balance: {ethBalance}</p>
                {tokenBalances.map((token) => (
                  <p key={token.symbol}>{token.symbol} Balance: {token.balance}</p>
                ))}
              </Form.Item>
            )}
          </Form>
        </>
      )}
    </AntModal>
  );
};

export default ProfileForm;
