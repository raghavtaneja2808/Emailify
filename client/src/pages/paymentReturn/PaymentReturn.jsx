import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";

const ReturnPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/checkout-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setStatus(data.payment_status === "paid" ? "Payment Successful! 🎉" : "Payment Failed ❌");
        })
        .catch(() => setStatus("Error fetching payment status."));
    }
  }, [sessionId]);

  return(
    <>
    <Header/>
   <h2>{status}</h2>
   </>
)
};

export default ReturnPage;
