import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import type Prisma from "@prisma/client";
import { useMutation } from "react-query";
import { redirectToCheckout } from "../checkout/product";
import { transformProduct } from "../../../utils/transform";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prisma = new PrismaClient();

    const products = await prisma.product.findMany();

    if (products.length) {
      res.status(200).json(products);
      res.end();
    } else {
      res.status(404);
      res.end();
    }
  } catch {
    res.status(500);
  }
};

export const checkoutCart = async (products: Array<Prisma.Product>) => {
  const stripeItems = products.map((product) => transformProduct(product));
  console.log(stripeItems);
  return await fetch(`/api/checkout/product`, {
    method: "POST",
    body: JSON.stringify(stripeItems),
  }).then((response) => response.json());
};

export const useCheckout = () => {
  return useMutation(
    (products: Array<Prisma.Product>) => checkoutCart(products),
    {
      onSuccess: redirectToCheckout,
    }
  );
};
