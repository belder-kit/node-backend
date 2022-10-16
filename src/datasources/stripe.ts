import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE || "", {
  apiVersion: "2022-08-01",
  telemetry: false,
});
