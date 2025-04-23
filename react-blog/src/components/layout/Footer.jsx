import React from "react";
import { Container, Row, Col } from "reactstrap";

function Footer() {
    return (
        <footer className="footer bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    <Col md="12" className="text-center">
                        <h2 className="mb-2">Read Our Blog</h2>
                        <p className="mb-0">정민의 사이드 프로젝트 작업 블로그입니다.</p>
                        <small className="text-white">© 2025 Sapple Project Blog. All rights reserved.</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;


// import React from "react";
// import {Col, Row} from "reactstrap";
//
// function Footer() {
//     return (
//         <div id="page-header" className="mb-3">
//           <Row>
//             <Col md="6" sm="auto" className="text-center m-auto">
//               <h1>Read Our Blog</h1>
//               <p>사플의 사이드 프로젝트 작업블로그 입니다</p>
//             </Col>
//           </Row>
//         </div>
//     );
// }
//
// export default Footer