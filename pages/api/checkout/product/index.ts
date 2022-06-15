import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { loadStripe } from "@stripe/stripe-js";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: JSON.parse(req.body),
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/failure`,
    });

    res.status(200).json({ id });
    res.end();
  } catch (err) {
    res.status(500).json(err);
  }
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export const redirectToCheckout = async (session: Stripe.Checkout.Session) => {
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  return stripe!.redirectToCheckout({
    sessionId: session.id,
  });
};
