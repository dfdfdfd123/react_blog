import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function BlogEdit() {
    const { boardIdx } = useParams();  // URL에서 boardIdx 가져오기
    const [post, setPost] = useState(null);  // 게시글 상태
    const [file, setFile] = useState(null); // 파일 상태
    const navigate = useNavigate();

    // 게시글 데이터 불러오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/blog/detail/${boardIdx}`);
                setPost(res.data);  // 게시글 데이터 저장
            } catch (error) {
                console.error("게시글 불러오기 실패", error);
            }
        };
        fetchPost();
    }, [boardIdx]);

    // 이미지 파일 선택 핸들러
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // 수정된 게시글 저장 (API 호출)
    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("createId", post.createId);
        formData.append("contents", post.contents);
        if (file) formData.append("file", file);  // 파일이 있으면 추가

        try {
            await axios.put(`http://localhost:8080/api/blog/edit/${boardIdx}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate(`/detail/${boardIdx}`);  // 수정 후 상세 페이지로 이동
        } catch (error) {
            console.error("게시글 수정 실패", error);
        }
    };

    // 데이터가 로드되지 않은 경우 대기 화면 표시
    if (!post) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <section>
                <div className="row mt-3">
                    <div className="col-sm-4 mx-auto">
                        <form onSubmit={handleSave}>
                            <div className="mt-3 form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={post.title}
                                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                                    placeholder="글 제목"
                                />
                                <label htmlFor="title">글 제목</label>
                            </div>
                            <div className="mt-3 form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="createId"
                                    name="createId"
                                    value={post.createId}
                                    onChange={(e) => setPost({ ...post, createId: e.target.value })}
                                    placeholder="사용자ID"
                                />
                                <label htmlFor="createId">사용자ID</label>
                            </div>
                            <div className="mt-3 form-floating">
                                <textarea
                                    className="form-control"
                                    id="contents"
                                    name="contents"
                                    value={post.contents}
                                    onChange={(e) => setPost({ ...post, contents: e.target.value })}
                                    placeholder="글 내용"
                                    style={{ height: "150px" }}
                                />
                                <label htmlFor="contents">글 내용</label>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="upload-files" className="form-label">이미지파일 : </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="upload-files"
                                    name="files"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mt-3 d-grid gap-2">
                                <Button type="submit" color="primary">수정</Button>
                                <Button type="reset" color="secondary" onClick={() => navigate(`/detail/${boardIdx}`)}>
                                    취소
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BlogEdit;


// import React from "react";
// import {Col, Row} from "reactstrap";
//
// function BlogEdit() {
//     return (
//         <div>
//             <section>
//                 <div className="row mt-3">
//                     <div className="col-sm-4 mx-auto">
//
//                         <form>
//                             <div className="mt-3 form-floating">
//                                 <input type="text" className="form-control" id="title" name="title"
//                                        placeholder="글 제목"/>
//                                 <label htmlFor="title">글 제목</label>
//                             </div>
//                             <div className="mt-3 form-floating">
//                                 <input type="text" className="form-control" id="createId" name="createId"
//                                        placeholder="사용자ID"/>
//                                 <label htmlFor="createId">사용자ID</label>
//                             </div>
//                             <div className="mt-3 form-floating">
//                                 <textarea className="form-control" id="contents" name="contents"
//                                           placeholder="글 내용" style={{height: "150px"}}></textarea>
//                                 <label htmlFor="contents">글 내용</label>
//                             </div>
//                             <div className="mt-3">
//                                 <label htmlFor="upload-files" className="form-label">이미지파일 : </label>
//                                 <input type="file" className="form-control" id="upload-files"
//                                        name="files"/>
//                             </div>
//                             <div className="mt-3 d-grid gap-2">
//                                 <button type="submit" className="btn btn-primary">등록</button>
//                                 <button type="reset" className="btn btn-secondary">취소</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }
//
// export default BlogEdit