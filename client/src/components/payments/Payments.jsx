import { useCallback, useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
  useCheckout,
  Elements,
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import {CheckoutProvider} from '@stripe/react-stripe-js';
import { Button, Typography, Box, Paper, CircularProgress } from "@mui/material";

import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../actions";
import Header from "../header/Header";
// const ProductDisplay = () => (
//     <section>
//       <div className="product">
//         <img
//           src="https://w7.pngwing.com/pngs/237/171/png-transparent-credit-card-bank-credit-card-thumbnail.png"
//           alt="cresits"
//         />
//         <div className="description">
//         <h3>Credits</h3>
//         <h5>Rs 100</h5>
//         </div>
//       </div>
//       <form action="http://localhost:5000/create-checkout-session" method="POST">
//         <button type="submit">
//           Checkout
//         </button>
//       </form>
//     </section>
//   );
//   const Message = ({ message }) => (
//     <section>
//       <p>{message}</p>
//     </section>
//   );
// const Payments=()=>{
//     const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay />
//   );
// }
const stripePromise = loadStripe("pk_test_51QwKX7CS6NujxjT2tghavf6us2WOiwhUYOT86LugkFHtAnWZCY0PA5FnwE9c6Qwl9NuE8JmygPpVIXqwxtZRfDeE0071srwn8y");

export const CheckoutForm = () => {
  const location = useLocation();
  const { credits } = location.state || {};  // ✅ Properly extract credits

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientSecret = useCallback(() => {
    console.log("******************")
    console.log(credits)
    return fetch("http://localhost:5000/create-checkout-session",{
      method: "POST",
      credentials: "include", // ✅ Ensures cookies (session) are sent
      headers: {
        "Content-Type": "application/json", // ✅ Important for JSON data
      },
      body: JSON.stringify({ credits })  // ✅ Sending credits to backend
  
  })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create checkout session");
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        return data.clientSecret;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const options = { fetchClientSecret};

  return (
    <>
<div className="pt-50"> {/* Add padding equal to header height */}
  <Header />
  <div className="checkout-container text-center">
    {loading && <p>Loading checkout...</p>}
    {error && <p className="error">Error: {error}</p>}
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  </div>
</div>

    </>
  );
};

export const Return = () => {
  const dispatch=useDispatch()
  const auth=useSelector((state)=>state.auth)
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(5); // Start countdown from 5 seconds
  const navigate = useNavigate();
 useEffect(() => {
    dispatch(fetchUser()); // Fetch updated user info after payment
  }, [auth]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    // Redirect when counter reaches 0
    if (counter === 0) {
      navigate("/");
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [counter, navigate]);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`http://localhost:5000/session-status?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch session status");
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading payment status...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (status === 'open') return <Navigate to="/checkout" />;
  
  if (status === 'complete') {
    return (
      <>
      <Header/>
      <section className="success-message mt-50">
        <h2>Payment Successful!</h2>
        <p>
          Thank you for your order! A confirmation email has been sent to {customerEmail}.
          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
          <br /><br /><br />
          <p>Redirecting you to Home Page in {counter}</p>
        </p>
      </section>
      </>
    );
  }
  return null;
};
// const stripePromise = loadStripe("pk_test_51QwKX7CS6NujxjT2tghavf6us2WOiwhUYOT86LugkFHtAnWZCY0PA5FnwE9c6Qwl9NuE8JmygPpVIXqwxtZRfDeE0071srwn8y");
// const CheckoutForm = ({ clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError("Card Element not found!");
//       setProcessing(false);
//       return;
//     }

//     const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: { card: cardElement },
//     });

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//     } else {
//       setSuccess(true);
//       setProcessing(false);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: "auto", textAlign: "center" }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Checkout
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
//           <CardElement />
//         </Box>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={processing || !stripe}
//         >
//           {processing ? <CircularProgress size={24} /> : "Pay Now"}
//         </Button>
//       </form>
//       {error && <Typography color="error" mt={2}>{error}</Typography>}
//       {success && <Typography color="success.main" mt={2}>Payment Successful!</Typography>}
//     </Paper>
//   );
// };

// const Payments = () => {
//   const [clientSecret, setClientSecret] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/create-payment-intent", { method: "POST" })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   return clientSecret ? (
//     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <CheckoutForm clientSecret={clientSecret} />
//       </Elements>
//     </Box>
//   ) : null;
// };

// export default Payments;