import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import cardImage from "../../assets/image.jpg"; // 이미지 추가


function BlogDetail() {

    const dummyData = {
        title: "첫 번째 게시글",
        content: "이것은 게시글의 내용입니다.",
        views: 123,
        createdAt: "2025-04-22 10:30",
    };


    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md="8">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h3">{dummyData.title}</CardTitle>
                            <CardText className="text-muted">
                                조회수: {dummyData.views} | 작성일: {dummyData.createdAt}
                            </CardText>
                            <hr/>
                            <CardText>{dummyData.content}</CardText>
                            <CardImg top width="100%" src={cardImage} alt="본문 이미지" className="my-4 rounded"/>
                            <CardText>
                                이미지를 포함한 설명이 이어집니다. 이 블로그는 부트스트랩과 리액트를 활용하여 만든 예제입니다.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default BlogDetail