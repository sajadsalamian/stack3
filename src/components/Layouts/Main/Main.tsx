import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function Main({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
}
