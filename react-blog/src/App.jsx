import {BrowserRouter, Route, Routes }  from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import {Container} from "reactstrap";
import CustomNavbar from "./components/layout/CustomNavbar.jsx";
import CardList from "./components/layout/CardList.jsx";
import Home from "./components/Home.jsx";
import BlogWrite from "./components/post/BlogWrite.jsx";



function App() {


    return (

        <BrowserRouter>
            {/* 공통 UI (항상 보이게 할 컴포넌트들) */}
            <CustomNavbar />
            <Header />

            {/* 페이지별 라우팅 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<BlogWrite />} />
            </Routes>

            {/* Footer도 항상 보이게 하고 싶으면 여기 */}
            <Footer />
        </BrowserRouter>

    );
}

export default App
