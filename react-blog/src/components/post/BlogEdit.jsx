import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useBlogStore from "../../stores/blogStore.jsx";

function BlogEdit() {
    const navigate = useNavigate();
    const { boardIdx } = useParams();
    const { selectedPost } = useBlogStore();

    const [title, setTitle] = useState("");
    const [createId, setCreateId] = useState("");
    const [contents, setContents] = useState("");
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [newFiles, setNewFiles] = useState([]);

    useEffect(() => {
        if (selectedPost) {
            setTitle(selectedPost.title);
            setCreateId(selectedPost.createId);
            setContents(selectedPost.contents);
            if (selectedPost.fileList && selectedPost.fileList.length > 0) {
                setSelectedFileNames(selectedPost.fileList.map(file => file.originalName));
            }
        }
    }, [selectedPost]);

    const handleFileChange = (e) => {
        setNewFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("createId", createId);
        formData.append("contents", contents);
        formData.append("boardIdx", boardIdx);

        if (newFiles.length > 0) {
            for (let file of newFiles) {
                formData.append("files", file);
            }
        }

        try {
            await axios.put(`http://localhost:8080/api/blog/post/${boardIdx}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("수정 완료!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("수정 실패");
        }
    };

    const handleDeleteFile = async (storedName) => {
        if (!window.confirm("정말 이 파일을 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/blog/file/${storedName}`);
            // 삭제된 파일 UI에서 제거
            setSelectedFileNames(prev => prev.filter(name => name !== storedName));
        } catch (error) {
            console.error("파일 삭제 오류", error);
            alert("파일 삭제에 실패했습니다.");
        }
    };


    return (
        <section>
            <div className="row mt-3">
                <div className="col-sm-4 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 form-floating">
                            <input type="text" className="form-control" id="title" value={title}
                                   onChange={(e) => setTitle(e.target.value)} placeholder="글 제목" />
                            <label htmlFor="title">글 제목</label>
                        </div>

                        <div className="mt-3 form-floating">
                            <input type="text" className="form-control" id="createId" value={createId}
                                   onChange={(e) => setCreateId(e.target.value)} placeholder="사용자ID" />
                            <label htmlFor="createId">사용자ID</label>
                        </div>

                        <div className="mt-3 form-floating">
                            <textarea className="form-control" id="contents" value={contents}
                                      onChange={(e) => setContents(e.target.value)}
                                      placeholder="글 내용" style={{ height: "150px" }} />
                            <label htmlFor="contents">글 내용</label>
                        </div>

                        {/* 기존 파일 표시 및 삭제 버튼 */}
                        {selectedPost?.fileList && selectedPost.fileList.length > 0 && (
                            <div className="mt-2">
                                <label className="form-label">첨부된 파일 목록</label>
                                <ul className="list-group">
                                    {selectedPost.fileList.map((file) => (
                                        <li key={file.storedName} className="list-group-item d-flex justify-content-between align-items-center">
                                            {file.originalName}
                                            <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDeleteFile(file.storedName)}>
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-3">
                            <label htmlFor="upload-files" className="form-label">이미지파일 (새로 선택 가능):</label>
                            <input type="file" className="form-control" id="upload-files" name="files" multiple onChange={handleFileChange} />
                            {selectedFileNames.length > 0 && (
                                <div className="mt-2 text-muted">
                                    현재 첨부된 파일: {selectedFileNames.join(", ")}
                                </div>
                            )}
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button type="submit" className="btn btn-primary">수정</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}





// import React, { useEffect, useState } from "react";
// import {useNavigate, useParams} from "react-router-dom";
// import useBlogStore from "../../stores/blogStore.jsx";
//
// // import { useBlogStore } from "../../stores/blogStore";
//
//
// function BlogEdit() {
//     const navigate = useNavigate();
//     const { selectedPost } = useBlogStore();
//
//     const { boardIdx } = useParams();
//
//     const [title, setTitle] = useState("");
//     const [createId, setCreateId] = useState("");
//     const [contents, setContents] = useState("");
//     const [ selectedFileNames,  setSelectedFileNames] = useState([]);
//
//     useEffect(() => {
//         if (selectedPost) {
//             setTitle(selectedPost.title);
//             setCreateId(selectedPost.createId);
//             setContents(selectedPost.contents);
//             if (selectedPost.fileList && selectedPost.fileList.length > 0) {
//                 setSelectedFileNames(selectedPost.fileList.map(file => file.originalName));
//             }
//         }
//     }, [selectedPost]);
//
//     return (
//         <section>
//              <div className="row mt-3">
//             <div className="col-sm-4 mx-auto">
//         <form>
//             <div className="mt-3 form-floating">
//                 <input type="text" className="form-control" id="title" value={title}
//                        onChange={(e) => setTitle(e.target.value)} placeholder="글 제목" />
//                 <label htmlFor="title">글 제목</label>
//             </div>
//
//             <div className="mt-3 form-floating">
//                 <input type="text" className="form-control" id="createId" value={createId}
//                        onChange={(e) => setCreateId(e.target.value)} placeholder="사용자ID" />
//                 <label htmlFor="createId">사용자ID</label>
//             </div>
//
//             <div className="mt-3 form-floating">
//                 <textarea className="form-control" id="contents" value={contents}
//                           onChange={(e) => setContents(e.target.value)}
//                           placeholder="글 내용" style={{ height: "150px" }} />
//                 <label htmlFor="contents">글 내용</label>
//             </div>
//
//             <div className="mt-3">
//                 <label htmlFor="upload-files" className="form-label">이미지파일 :</label>
//                 <input type="file" className="form-control" id="upload-files" name="files" />
//                 {selectedFileNames.length > 0 && (
//                     <div className="mt-2 text-muted">
//                         현재 첨부된 파일: {selectedFileNames.join(", ")}
//                     </div>
//                 )}
//             </div>
//
//             <div className="mt-3 d-grid gap-2">
//                 <button type="submit" className="btn btn-primary">등록</button>
//                 <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>취소</button>
//             </div>
//         </form>
//             </div>
//              </div>
//         </section>
//
//     );
// }
























// import useBlogStore from "../../stores/blogStore";
// import { useEffect, useState } from "react";
//
// function BlogEdit() {
//     const { selectedPost } = useBlogStore();
//     const [formData, setFormData] = useState({
//         title: "",
//         createId: "",
//         contents: "",
//         files: [],
//     });
//
//     useEffect(() => {
//         if (selectedPost) {
//             setFormData({
//                 title: selectedPost.title,
//                 createId: selectedPost.createId,
//                 contents: selectedPost.contents,
//                 files: selectedPost.fileList || [],
//             });
//         }
//     }, [selectedPost]);
//
//     return (
//         <div>
//             <section>
//                 <div className="row mt-3">
//                     <div className="col-sm-4 mx-auto">
//                         <form>
//                             <div className="mt-3 form-floating">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="title"
//                                     name="title"
//                                     value={formData.title}
//                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                 />
//                                 <label htmlFor="title">글 제목</label>
//                             </div>
//
//                             <div className="mt-3 form-floating">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="createId"
//                                     name="createId"
//                                     value={formData.createId}
//                                     readOnly
//                                 />
//                                 <label htmlFor="createId">사용자ID</label>
//                             </div>
//
//                             <div className="mt-3 form-floating">
//                                 <textarea
//                                     className="form-control"
//                                     id="contents"
//                                     name="contents"
//                                     style={{ height: "150px" }}
//                                     value={formData.contents}
//                                     onChange={(e) => setFormData({ ...formData, contents: e.target.value })}
//                                 />
//                                 <label htmlFor="contents">글 내용</label>
//                             </div>
//
//                             {/* 이미지 미리 보기 */}
//                             {formData.files.length > 0 && (
//                                 <div className="mt-3">
//                                     {formData.files.map((file, idx) => (
//                                         <img
//                                             key={idx}
//                                             src={`http://localhost:8080${file.filePath}`}
//                                             alt={`img-${idx}`}
//                                             style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//
//                             <div className="mt-3 d-grid gap-2">
//                                 <button type="submit" className="btn btn-primary">수정</button>
//                                 <button type="reset" className="btn btn-secondary">취소</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }


export default BlogEdit