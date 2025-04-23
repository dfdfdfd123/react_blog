
// components/layout/Layout.jsx
import React from "react";
import CustomNavbar from "./components/layout/CustomNavbar.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";


function Layout({ children }) {
    return (
        <>
            <CustomNavbar />
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
