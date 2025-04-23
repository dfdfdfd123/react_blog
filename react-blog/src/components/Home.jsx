import CustomNavbar from "./layout/CustomNavbar.jsx";
import Header from "./layout/Header.jsx";
import CardList from "./layout/CardList.jsx";
import {useEffect} from "react";


function Home() {

    useEffect(() => {
        //   axios 를 사용하여 spring boot 서버와 통신
    }, [])

    return (
        <div>
          {/*<CustomNavbar/>*/}
          {/*<Header/>*/}
          <CardList/>
        </div>
    );
}

export default Home