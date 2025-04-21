import {BrowserRouter, Route, Routes }  from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Container} from "reactstrap";
import CustomNavbar from "./components/CustomNavbar.jsx";
import CardList from "./components/CardList.jsx";
import Home from "./components/Home.jsx";



function App() {


    return (

        // 사용자가 웹  브라우저의 주소창에 입력하는 주소를 설정함
        <BrowserRouter>
            <Routes>
                {/* path 속성의 url 은 절대/상대 경로 모두 사용 가능*/}
                {/*상대 경로 형식 사용 시 부모 컴포넌트(Route)의 주소가 존재해야 함 */}
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App
