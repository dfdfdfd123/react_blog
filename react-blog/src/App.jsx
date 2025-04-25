import {BrowserRouter, Route, Routes }  from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import {Container} from "reactstrap";
import CustomNavbar from "./components/layout/CustomNavbar.jsx";
import CardList from "./components/layout/CardList.jsx";
import Home from "./components/Home.jsx";
import BlogWrite from "./components/post/BlogWrite.jsx";
import BlogDetail from "./components/post/BlogDetail.jsx";
import BlogEdit from "./components/post/BlogEdit.jsx";
import Layout from "./Layout.jsx";
import SearchResult from "./components/layout/SearchResult.jsx";



function App() {


    return (
        <BrowserRouter>
            <Layout>

            {/* 페이지별 라우팅 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<BlogWrite />} />
                {/*<Route path="/detail" element={<BlogDetail />} />*/}
                <Route path="/detail/:boardIdx" element={<BlogDetail />} />
                {/*<Route path="/edit" element={<BlogEdit />} />*/}
                <Route path="/edit/:boardIdx" element={<BlogEdit />} />
                <Route path="/search" element={<SearchResult />} /> {/* ← 검색 결과 경로 추가 */}
            </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App
