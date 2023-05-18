import './App.css';
import {ethers} from "ethers";
import {useState, useEffect} from "react";
import FaucetAbi from "./abi/Faucet.json"
import Swal from "sweetalert2";

const faucetContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

function App() {

  const[walletAddress, setWalletAddress] = useState("");
  const[provider, setProvider] = useState("");


  useEffect(() =>{
    connectWallet();
  }, [walletAddress])

  const connectWallet = async () => {
    if(typeof window.ethereum !== 'undefined)') {

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await provider.send("eth_requestAccounts");

        setProvider(provider);

        setWalletAddress(accounts[0]);

        console.log(accounts);

      } catch (err) {

       

    }
   } else {
    Swal.fire({
      title: 'Error!',
      text: "create a wallet",
      icon: 'error',
      confirmButtonText: 'Okay'
    })


   }
  }

  const getTokens = async () => {

    try{

      const contract = new ethers.Contract(faucetContractAddress, FaucetAbi, provider.getSigner()); //contract address, ABI, provider
  
      const transaction = await contract.requestToken();
  
      console.log("transaction", transaction);

      if(transaction.hash) {
        Swal.fire({
          title: 'Success!',
          text: "Tx successfully sent",
          icon: 'success',
          confirmButtonText: 'Okay'
        })
      }
    }

     catch(err) {

      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Okay'
      })

    }

  }

  return (
    <>
      <nav className="navbar">

        <div className="container">

          <div className="navbar-brand">
            <h1>MyToken (MTK) Faucet</h1>
          </div>

          <div className="navbar-menu">

            <button className="button is-white connect-wallet" onClick={connectWallet}>
              
              {walletAddress ? `Connected: ${walletAddress.substring(0,5)}...${walletAddress.substring(38)}` : "Connect Wallet"}
              

              
              </button>
          </div>

        </div>

      </nav>

      <section className='hero'>
        <div className='faucet-hero-body'>
          <div className='box'>

          <input 
          type="text" 
          className='input' 
          placeholder='Enter your wallet address'
          defaultValue={walletAddress}
          />

          <button className='button' onClick={getTokens}>Get Tokens</button>

          </div>
        </div>
      </section>
    </>
    );
}

export default App;
