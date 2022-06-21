import React from "react";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="h-full w-full bg-white py-16 px-4 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 self-center">
          FullStack Next.js E-commerce
        </h1>
        {props.children}
      </div>
    </>
  );
};

export default Layout;
