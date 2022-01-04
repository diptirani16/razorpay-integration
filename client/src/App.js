import './App.css';
import axios from 'axios';

function App() {

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    const result = await axios.post('http://localhost:8080/pay/donate')
    if (!result) {
      alert('Something went wrong!');
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: 'Dipti Rani',
      description: 'Test Transaction',
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("http://localhost:8080/pay/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Dipti Rani",
        email: "gdipti642@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "New Colony",
      },
      theme: {
        color: "#61dafb",
      },

    }
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

return (
  <div className="App">
    <header className="App-header">
      <p>Your few can make many!!</p>
      <button className="App-link" onClick={displayRazorpay}>
        Donate ₹500
      </button>
    </header>
  </div>
);
}

export default App;
