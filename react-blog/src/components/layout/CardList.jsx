// components/layout/CardList.jsx

import React, { useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../../stores/blogStore";
import axios from "axios";

function CardList() {
    const navigate = useNavigate();
    const { posts, setPosts } = useBlogStore();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/blog/list");
                setPosts(res.data);
            } catch (error) {
                console.error("게시글 불러오기 실패", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container className="mb-5">
            <Row>
                {posts.map((card) => (
                    <Col md="4" className="mb-4" key={card.boardIdx}>
                        <Card>
                            {card.fileList && card.fileList.length > 0 && (
                                <CardImg
                                    top
                                    width="100%"
                                    src={`http://localhost:8080${card.fileList[0].filePath}`}
                                    alt="카드 이미지"
                                />
                            )}
                            <CardBody>
                                <CardTitle tag="h5">{card.title}</CardTitle>
                                <CardText>{card.contents.substring(0, 50)}...</CardText>
                                <Button color="primary" onClick={() => navigate(`/detail/${card.boardIdx}`)}>
                                    자세히 보기
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CardList;



// import React, { useEffect } from "react";
// import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Container, Button } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import useBlogStore from "../../stores/blogStore";
// import axios from "axios";
//
// function CardList() {
//     const navigate = useNavigate();
//     const { posts, setPosts } = useBlogStore();
//
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8080/api/blog/list");
//                 setPosts(res.data);
//             } catch (error) {
//                 console.error("게시글 불러오기 실패", error);
//             }
//         };
//
//         fetchPosts();
//     }, []);
//
//     return (
//         <Container className="mb-5">
//             <Row>
//                 {posts.map((card) => (
//                     <Col md="4" className="mb-4" key={card.boardIdx}>
//                         <Card>
//                             {card.files && card.files[0] && (
//                                 <CardImg top width="100%" src={`http://localhost:8080${card.files[0].filePath}`} alt="카드 이미지" />
//                             )}
//
//                             <CardBody>
//                                 <CardTitle tag="h5">{card.title}</CardTitle>
//                                 <CardText>{card.contents.substring(0, 50)}...</CardText>
//                                 <Button color="primary" onClick={() => navigate(`/detail?id=${card.boardIdx}`)}>자세히 보기</Button>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// }
//
// export default CardList;


// import React from "react";
// import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Container, Button } from "reactstrap";
// import {useNavigate} from "react-router-dom";
// import cardImage from "../../assets/image2.jpg";
//
// function CardList() {
//
//     const navigate = useNavigate(); // ← 추가
//
//     const cardData = [
//         { id: 1, title: "첫 번째 카드", text: "설명 텍스트입니다." },
//         { id: 2, title: "두 번째 카드", text: "다른 설명 텍스트입니다." },
//         { id: 3, title: "세 번째 카드", text: "추가적인 설명 텍스트입니다." },
//         { id: 4, title: "네 번째 카드", text: "설명 텍스트입니다." },
//         { id: 5, title: "다섯 번째 카드", text: "다른 설명 텍스트입니다." },
//         { id: 6, title: "여섯 번째 카드", text: "추가적인 설명 텍스트입니다." },
//     ];
//
//     return (
//         <Container className="mb-5">
//             <Row>
//                 {cardData.map((card) => (
//                     <Col md="4" className="mb-4" key={card.id}>
//                         <Card>
//                             <CardImg top width="100%" src={cardImage} alt="카드 이미지" />
//                             <CardBody>
//                                 <CardTitle tag="h5">{card.title}</CardTitle>
//                                 <CardText>{card.text}</CardText>
//                                 <Button color="primary" onClick={() => navigate("/detail")}>자세히 보기</Button>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// }
//
// export default CardList;