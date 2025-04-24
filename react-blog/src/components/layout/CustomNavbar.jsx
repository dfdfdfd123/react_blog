import React, {useState} from "react";
import { Navbar, NavbarBrand, Input, Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../../stores/blogStore.jsx";
import axios from "axios"; // ← 추가


function CustomNavbar() {

    const navigate = useNavigate(); // ← 추가

    const [searchInput, setSearchInput] = useState("");
    const { setPosts } = useBlogStore();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/blog/search`, {
                params: { keyword: searchInput }
            });
            setPosts(response.data);
            navigate("/search");     // 검색 결과 페이지로 이동
        } catch (error) {
            console.error("검색 오류:", error);
        }
    };

    return (
        <Navbar dark color="dark" expand="md" className="py-2">
            <Container>
                <div className="d-flex justify-content-between align-items-center w-100">

                    {/* 왼쪽: Brand */}
                    <NavbarBrand href="/" className="text-white" onClick={() => navigate(`/`)}>
                        Side Project's Blog
                    </NavbarBrand>

                    {/* 가운데: 검색창 + 글작성 */}
                    <div className="d-flex align-items-center" style={{ flexGrow: 1, justifyContent: "center" }}>
                        <Input
                            type="text"
                            placeholder="검색 하세요..."
                            className="me-2"
                            style={{ width: '800px' /* 700px */ }}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <Button color="success me-2" size="sm"  onClick={() => navigate("/write")}>글 작성</Button>
                        {/*<Button color="secondary" size="sm" className="me-2">REGISTER</Button>*/}
                        {/*<Button color="secondary" size="sm">LOGIN</Button>*/}
                    </div>

                    {/* 오른쪽: 회원 관련 버튼 */}
                    <div className="d-flex align-items-center">
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;


