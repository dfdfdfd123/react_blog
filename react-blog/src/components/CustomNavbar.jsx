import React from "react";
import { Navbar, NavbarBrand, Input, Button, Container } from "reactstrap";

function CustomNavbar() {
    return (
        <Navbar dark color="dark" expand="md" className="py-2">
            <Container>
                <div className="d-flex justify-content-between align-items-center w-100">

                    {/* 왼쪽: Brand */}
                    <NavbarBrand href="#" className="text-white">
                        Side Project's Blog
                    </NavbarBrand>

                    {/* 가운데: 검색창 + 글작성 */}
                    <div className="d-flex align-items-center" style={{ flexGrow: 1, justifyContent: "center" }}>
                        <Input
                            type="text"
                            placeholder="검색 하세요..."
                            className="me-2"
                            style={{ width: '700px' }}
                        />
                        <Button color="success me-2" size="sm">글 작성</Button>
                        <Button color="secondary" size="sm" className="me-2">REGISTER</Button>
                        <Button color="secondary" size="sm">LOGIN</Button>
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


// import React from "react";
// import { Navbar, NavbarBrand, Input, Button, Container } from "reactstrap";
//
// function CustomNavbar() {
//   return (
//       <Navbar dark color="dark" expand="md" className="py-2">
//         <Container className="d-flex justify-content-between align-items-center">
//           <NavbarBrand href="#" className="text-white">Side Project's Blog</NavbarBrand>
//           <Input type="text" placeholder="Search..." className="me-3" style={{ maxWidth: '300px' }} />
//             <Button color="success" size="sm" className="">글 작성</Button>
//             <Button color="secondary" size="sm" className="me-2">REGISTER</Button>
//             <Button color="secondary" size="sm">LOGIN</Button>
//           <div>
//
//           </div>
//         </Container>
//       </Navbar>
//   );
// }
//
// export default CustomNavbar;