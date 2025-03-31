const stripe = require('stripe')('sk_test_51QwKX7CS6NujxjT24kKa4AitatsfZdUfXOQfxOV9WxyCKr64lRpQJOaHjaAbe8OITvtfHOjVg3zjcUOuwHYMvmad00Jaf5BVF9');
const mongoose = require("mongoose");
const User = mongoose.model('users'); // Import your User model

module.exports = (app) => {
  const YOUR_DOMAIN = 'http://localhost:3000';

  // ✅ Store googleID in metadata
  app.post('/create-checkout-session', async (req, res) => {
    console.log("-----------------------------------------")
    console.log(req.body);
    console.log("user : ",req.user);
    const { credits } = req.body; // ✅ Extract `credits` correctly
    const parsedCredits = parseInt(credits, 10); // ✅ Ensure it's a number

    if (isNaN(parsedCredits) || parsedCredits <= 0) {
        return res.status(400).json({ error: "Invalid credits value." }); // ✅ Prevent invalid values
    }

    const amount = parsedCredits * 100; // ✅ Correct calculation of amount
    console.log("Stripe checkout page is called");
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Credits',
              description: 'Your Survey Credits worth Rs '+credits,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: { googleID: req.user.googleID?req.user.googleID:"0",credits: credits.toString()}, // ✅ Attach googleID
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.json({ clientSecret: session.client_secret });
  });

  // ✅ Use metadata.googleID instead of req.user
  app.get("/session-status", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
      res.json({ 
        status: session.status, 
        customer_email: session.customer_details?.email || "No email provided" 
      });

      console.log("Session metadata:", session.metadata);

      // ✅ Fetch user based on googleID
      const user = await User.findOne({ googleID: session.metadata.googleID });
      const purchasedCredits = parseInt(session.metadata.credits) || 0; // ✅ Read credits from metadata

      if (user && session.payment_status === "paid" && !session.metadata.creditsAdded) {
        user.credits += purchasedCredits/2;
        await user.save();

        // ✅ Mark session as processed to prevent duplicate additions
        await stripe.checkout.sessions.update(req.query.session_id, {
          metadata: { ...session.metadata, creditsAdded: "true" },
        });

        console.log("Credits added successfully");
      } else if (!user) {
        console.warn("User not found for googleID:", session.metadata.googleID);
      }

    } catch (error) {
      console.error("Error fetching session:", error);
      res.status(500).json({ error: "Failed to retrieve session" });
    }
  });
};
