import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import useBlogStore from "../../stores/blogStore.jsx";




function BlogDetail() {

    const { boardIdx } = useParams();
    const [board, setBoard] = useState(null);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");


    const navigate = useNavigate();

    const { setSelectedPost } = useBlogStore(); // 상단에 추가


    useEffect(() => {

        // 글 상세 로딩
        axios
            .get(`http://localhost:8080/api/blog/${boardIdx}`)
            .then((res) => {
                console.log("응답 데이터:", res.data);  // ← 이게 null이면 백엔드 문제
                setBoard(res.data);
            })
            .catch((err) => {
                console.error("게시글 로딩 오류", err);
            });

        // 댓글 불러오기
        axios
            // .get(`http://localhost:8080/api/blog/comments/${boardIdx}`)
            .get(`http://localhost:8080/api/blog/${boardIdx}/comments`) // ← 수정
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("댓글 로딩 오류", err);
            });

    }, [boardIdx]);

    if (!board) {
        return <p className="text-center mt-5">게시글을 불러오는 중입니다...</p>;
    }

    // 글 삭제
    const handlePostDelete = async () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/api/blog/delete/${boardIdx}`);
            alert('삭제되었습니다.');
            navigate('/'); // 목록 페이지 등으로 리다이렉트
        } catch (error) {
            console.error('삭제 실패:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };


    // 댓글 작성
    const handleCommentSubmit = (e) => {
        e.preventDefault();

        const newCommentData = {
            boardIdx: parseInt(boardIdx),
            userId: "임시사용자", // 로그인 기능 있다면 해당 사용자 ID 사용
            content: newComment,
        };

        axios.post(`http://localhost:8080/api/blog/${boardIdx}/comments`, newCommentData)
            .then(() => {
                setNewComment(""); // 입력창 초기화
                // 새로고침 없이 목록 업데이트
                return axios.get(`http://localhost:8080/api/blog/${boardIdx}/comments`);
            })
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("댓글 등록 오류", err);
            });
    };

    // 댓글의 수정 버튼 클릭 시

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.commentId);
        setEditedContent(comment.content);
    };

    const handleUpdateSubmit = (commentId) => {
        axios.put(`http://localhost:8080/api/blog/comments/${commentId}`, {
            commentId: commentId,  // ✅ 이 부분 추가
            boardIdx: parseInt(boardIdx),
            content: editedContent,
            userId: "임시사용자"    // ✅ 수정자 정보도 보내야 한다면 같이 전송
        })
            .then(() => {
                setEditingCommentId(null);
                setEditedContent("");
                return axios.get(`http://localhost:8080/api/blog/${boardIdx}/comments`);
            })
            .then((res) => {
                setComments(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error("댓글 수정 오류", err);
            });
    };


    // 댓글 삭제

    const handleDelete = (commentId) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8080/api/blog/comments/${commentId}`)
                .then(() => {
                    return axios.get(`http://localhost:8080/api/blog/${boardIdx}/comments`);
                })
                .then((res) => {
                    setComments(res.data);
                })
                .catch((err) => {
                    console.error("댓글 삭제 오류", err);
                });
        }
    };




    return (

        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md="8">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h3">{board.title}</CardTitle>
                            <CardText className="text-muted">
                                조회수: {board.hitCnt} | 작성일: {board.createDate}
                            </CardText>
                            <hr />
                            <CardText>{board.contents}</CardText>

                            {/* 이미지 렌더링 */}
                            {board.fileList && board.fileList.length > 0 && (
                                board.fileList.map((file, index) => (
                                    <CardImg
                                        key={index}
                                        top
                                        width="100%"
                                        // src={`/upload/${file.storedFileName}`}
                                        src={`http://localhost:8080/upload/${file.storedName}`}

                                        alt={`이미지 ${index + 1}`}
                                        className="my-4 rounded"
                                    />
                                ))
                            )}

                            <CardText>
                                이미지를 포함한 설명이 이어집니다. 이 블로그는 부트스트랩과 리액트를 활용하여 만든 예제입니다.
                            </CardText>

                            <div className="d-flex justify-content-end">
                                <Button color="primary"  className="me-2" onClick={() =>  {
                                    setSelectedPost(board);  // 선택된 게시글 저장
                                    // navigate(`/edit`);
                                    navigate(`/edit/${board.boardIdx}`);
                                }}>
                                    수정
                                </Button>
                                <Button color="danger" onClick={handlePostDelete }>
                                    삭제
                                </Button>
                            </div>
                        </CardBody>
                    </Card>



                    {/* 댓글 섹션 */}
                    <div className="mt-5">
                        <h5>댓글</h5>
                        <hr/>

                        {comments.length === 0 ? (
                            <p className="text-muted">아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
                        ) : (
                            comments.map((comment) => (
                                <Card key={comment.commentId} className="mb-3" style={{ backgroundColor: "#f9f9f9" }}>
                                    <CardBody>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                            <strong>{comment.userId}</strong>
                                            <small className="text-muted">{comment.createdAt}</small>
                                        </div>

                                        {editingCommentId === comment.commentId ? (
                                            <textarea
                                                className="form-control mb-2"
                                                rows="3"
                                                value={editedContent}
                                                onChange={(e) => setEditedContent(e.target.value)}
                                            />
                                        ) : (
                                            <CardText>{comment.content}</CardText>
                                        )}

                                        <div style={{ textAlign: "right" }}>
                                            {editingCommentId === comment.commentId ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        className="me-2"
                                                        onClick={() => handleUpdateSubmit(comment.commentId)}
                                                    >
                                                        완료
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={() => setEditingCommentId(null)}
                                                    >
                                                        취소
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        className="me-2"
                                                        onClick={() => handleEditClick(comment)}
                                                    >
                                                        수정
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        onClick={() => handleDelete(comment.commentId)}
                                                    >
                                                        삭제
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                        )}


                        {/* 댓글 작성 폼 */}
                        <div className="mt-4">
                            <h6>댓글 작성</h6>
                            <Card className="p-3" style={{backgroundColor: "#fdfdfd"}}>

                                <form onSubmit={handleCommentSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="commentContent" className="form-label">내용</label>
                                        <textarea
                                            className="form-control"
                                            id="commentContent"
                                            rows="3"
                                            placeholder="댓글을 입력하세요..."
                                            style={{resize: "none"}}
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div style={{textAlign: "right"}}>
                                        <Button type="submit" color="primary">등록</Button>
                                    </div>
                                </form>

                            </Card>
                        </div>
                    </div>

                </Col>
            </Row>

        </Container>
    );
}

export default BlogDetail


// <Container className="my-5">
//     <Row className="justify-content-center">
//         <Col md="8">
//             <Card>
//                 <CardBody>
//                     <CardTitle tag="h3">{dummyData.title}</CardTitle>
//                     <CardText className="text-muted">
//                         조회수: {dummyData.views} | 작성일: {dummyData.createdAt}
//                     </CardText>
//                     <hr/>
//                     <CardText>{dummyData.content}</CardText>
//                     <CardImg top width="100%" src={cardImage} alt="본문 이미지" className="my-4 rounded"/>
//                     <CardText>
//                         이미지를 포함한 설명이 이어집니다. 이 블로그는 부트스트랩과 리액트를 활용하여 만든 예제입니다.
//                     </CardText>
//                 </CardBody>
//             </Card>