const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
//firebase fix error
//setGlobalOption({ maxInstance: 10 });
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});
app.post("/payment/create", async (req, res) => {
  try {
    const total = req.query.total;
    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(total),
        currency: "usd",
      });
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } else {
      res.status(400).json({ message: "total must be greater than 0" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error please try again" });
  }
});
app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server Running on PORT:4000,http://localhost:5000");
});
