import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function Main({
  children,
  title = "",
  showHeader = true,
  showFooter = false,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-dark-black">
      <meta name={title} content="React, JavaScript, semantic markup, html" />
      <ToastContainer />
      {showHeader && <Header />}
      <>{children}</>
      {showFooter && <Footer />}
    </div>
  );
}

export function HeadMeta({
  title = "",
  description = "",
  keywords = "",
  image = "",
  name = "",
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title} - NITRO W3</title>
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph tags (OG) */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* OG image tags */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:alt" content={`Image of ${title} site`} />
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
