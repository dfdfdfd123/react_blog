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
import { UserProvider } from "./stores/userContext.jsx";
import Layout from "./Layout.jsx";



function App() {


    return (
        <UserProvider>
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
            </Routes>
            </Layout>
        </BrowserRouter>
        </UserProvider>
    );
}

export default App
