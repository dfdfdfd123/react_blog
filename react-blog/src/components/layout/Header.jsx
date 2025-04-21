import React from "react";
import {Row, Col, Container} from "reactstrap";
import backgroundImage from "../../assets/image2.jpg"; // 상대경로로 불러오기

function Header() {
    const headerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        // backgroundPosition: "center bottom",
        backgroundPosition: "center bottom",
        padding: "100px 0",
        color: "white",
        textAlign: "center"
    };

    return (
        <div id="page-header" className="mb-3" style={headerStyle}>
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>Read Our Blog</h1>
                        <p style={{ fontSize: "18px", marginTop: "10px" }}>사플의 사이드 프로젝트 작업블로그 입니다</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header