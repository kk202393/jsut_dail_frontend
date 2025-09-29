import "bootstrap/dist/css/bootstrap.css";
import "./style/scss/style.scss";
import "animate.css/animate.css";
import {Providers}  from '../redux/provider/Providers';
import ToastProvider from "../app/utils/ToastProvider";

export const metadata = {
  title: "Narayan Group",
  description: "Listing Your Product Here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={``}>
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
