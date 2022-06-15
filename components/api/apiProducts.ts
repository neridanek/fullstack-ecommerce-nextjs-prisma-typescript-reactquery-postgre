import { Prisma } from "@prisma/client";
import { useMutation, useQuery } from "react-query";
import { redirectToCheckout } from "../../pages/api/checkout/product";
import { transformProduct } from "../../utils/transform";

export const getProducts = async () => {
  return await fetch("/api/products", {
    method: "GET",
  }).then((response) => response.json());
};

export const useGetProducts = () => {
  return useQuery("products", getProducts);
};

const buyProduct = async (product: Prisma.Product) => {
  const stripeItem = transformProduct(product);
  console.log(stripeItem);
  return await fetch(`/api/checkout/product`, {
    method: "POST",
    body: JSON.stringify([stripeItem]),
  }).then((response) => response.json());
};

export const useBuyProduct = () => {
  return useMutation((product: Prisma.Product) => buyProduct(product), {
    onSuccess: redirectToCheckout,
  });
};
