import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import useBlogStore from "../../stores/blogStore";
import { useNavigate } from "react-router-dom";

function SearchResult() {
    const { posts } = useBlogStore();
    const navigate = useNavigate();

    if (!Array.isArray(posts)) {
        return (
            <Container className="mt-5">
                <h2 className="text-center mb-4">검색 결과</h2>
                <p className="text-center">검색 결과가 없습니다.</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">검색 결과</h2>
            <Row>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Col key={post.boardIdx} md="4" className="mb-4">
                            <Card className="h-100 shadow-sm">
                                {/*{post.fileList && post.fileList.length > 0 && (*/}
                                {/*    <img*/}
                                {/*        src={`http://localhost:8080${post.fileList[0].filePath}`}*/}
                                {/*        alt="카드 이미지"*/}
                                {/*        className="card-img-top"*/}
                                {/*    />*/}
                                {/*)}*/}
                                {post.fileList && post.fileList.length > 0 ? (
                                    <img
                                        src={`http://localhost:8080${post.fileList[0].filePath}`}
                                        alt="카드 이미지"
                                        className="card-img-top"
                                        style={{ height: "450px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        className="card-img-top"
                                        style={{
                                            height: "450px",
                                            backgroundColor: "#f0f0f0",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#aaa",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        이미지 없음
                                    </div>
                                )}

                                <CardBody>
                                    <CardTitle tag="h5" className="fw-bold">{post.title}</CardTitle>
                                    <CardText className="text-muted mb-2">작성자: {post.createId}</CardText>
                                    <CardText>
                                        {post.contents.length > 1
                                            ? `${post.contents.slice(0, 100)}...`
                                            : post.contents}
                                    </CardText>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            color="primary"
                                            size="sm"
                                            onClick={() => navigate(`/detail/${post.boardIdx}`)}>
                                            자세히 보기
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center">검색 결과가 없습니다.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}


export default SearchResult;


// import React from "react";
// import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
// import useBlogStore from "../../stores/blogStore";
// import { useNavigate } from "react-router-dom";
//
// function SearchResult() {
//     const { posts } = useBlogStore();
//     const navigate = useNavigate();
//
//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">검색 결과</h2>
//             <Row>
//
//                 {posts.length > 0 ? (
//                     posts.map((post) => (
//                         <Col key={post.boardIdx} md="4" className="mb-4">
//                             <Card className="h-100 shadow-sm">
//                                 <CardBody>
//                                     <CardTitle tag="h5" className="fw-bold">{post.title}</CardTitle>
//                                     <CardText className="text-muted mb-2">작성자: {post.userId}</CardText>
//                                     <CardText>
//                                         {post.content.length > 100
//                                             ? `${post.content.slice(0, 100)}...`
//                                             : post.content}
//                                     </CardText>
//                                     <div className="d-flex justify-content-end">
//                                         <Button
//                                             color="primary"
//                                             size="sm"
//                                             onClick={() => navigate(`/detail/${post.boardIdx}`)}>
//                                             자세히 보기
//                                         </Button>
//                                     </div>
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     ))
//                 ) : (
//                     <Col>
//                         <p className="text-center">검색 결과가 없습니다.</p>
//                     </Col>
//                 )}
//             </Row>
//         </Container>
//     );
// }
//
// export default SearchResult;

// import React from "react";
// import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
// import useBlogStore from "../../stores/blogStore";
// import { useNavigate } from "react-router-dom";
//
// function SearchResult() {
//     const { posts } = useBlogStore();
//     const navigate = useNavigate();
//
//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">검색 결과</h2>
//             <Row>
//                 {posts.length > 0 ? (
//                     posts.map((post) => (
//                         <Col key={post.boardIdx} md="4" className="mb-4">
//                             <Card className="h-100 shadow-sm">
//                                 <CardBody>
//                                     <CardTitle tag="h5" className="fw-bold">{post.title}</CardTitle>
//                                     <CardText className="text-muted mb-2">작성자: {post.userId}</CardText>
//                                     <CardText>
//                                         {post.content.length > 100
//                                             ? `${post.content.slice(0, 100)}...`
//                                             : post.content}
//                                     </CardText>
//                                     <div className="d-flex justify-content-end">
//                                         <Button
//                                             color="primary"
//                                             size="sm"
//                                             onClick={() => navigate(`/detail/${post.boardIdx}`)}>
//                                             자세히 보기
//                                         </Button>
//                                     </div>
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     ))
//                 ) : (
//                     <Col>
//                         <p className="text-center">검색 결과가 없습니다.</p>
//                     </Col>
//                 )}
//             </Row>
//         </Container>
//     );
// }
//
// export default SearchResult;

