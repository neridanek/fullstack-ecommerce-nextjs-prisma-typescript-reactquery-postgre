import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import Layout from "../components/Layout";
import Products from "../components/Products";
import { getSession } from "next-auth/react";
import { getProducts } from "../components/api/apiProducts";
import Checkout from "../components/Checkout";
import Router, { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
export default function Home() {
  return (
    <Layout>
      <Products />
      <Checkout />
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);

  await queryClient.prefetchQuery("products", getProducts);
  if (!session) {
    return {
      redirect: {
        destination: process.env.NEXTAUTH_CALLBACK_URL,
        permanent: false,
      },
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
