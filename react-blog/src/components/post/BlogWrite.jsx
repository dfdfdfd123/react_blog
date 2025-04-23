
import { Link } from 'react-router-dom';
import { useState} from "react";
import axios from "axios";

function BlogWrite() {


    const [formData, setFormData] = useState({
        title: '',
        createId: '',
        contents: ''
    });
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('createId', formData.createId);
        data.append('contents', formData.contents);

        // 파일 여러 개 추가
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/blog/write", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            alert("글이 성공적으로 등록되었습니다!");
        } catch (error) {
            console.error("업로드 오류:", error);
            alert("오류 발생");
        }
    };

    return (


        <div>
            <section>
                <div className="row mt-3">
                    <div className="col-sm-4 mx-auto">

                        <form onSubmit={handleSubmit}>
                            <div className="mt-3 form-floating">
                                <input type="text" className="form-control" id="title" name="title"
                                       placeholder="글 제목" onChange={handleChange}/>
                                <label htmlFor="title">글 제목</label>
                            </div>
                            <div className="mt-3 form-floating">
                                <input type="text" className="form-control" id="createId" name="createId"
                                       placeholder="사용자ID" onChange={handleChange}/>
                                <label htmlFor="createId">사용자ID</label>
                            </div>
                            <div className="mt-3 form-floating">
                                <textarea className="form-control" id="contents" name="contents"
                                          placeholder="글 내용" style={{height: "150px"}}
                                          onChange={handleChange}></textarea>
                                <label htmlFor="contents">글 내용</label>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="upload-files" className="form-label">이미지파일 : </label>
                                <input type="file" className="form-control" id="upload-files"
                                       name="files" multiple onChange={handleFileChange}/>
                            </div>
                            <div className="mt-3 d-grid gap-2">
                                <button type="submit" className="btn btn-primary">등록</button>
                                <button type="reset" className="btn btn-secondary">취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>


        // <div>
        //     <section>
        //         <div className="row mt-3">
        //             <div className="col-sm-4 mx-auto">
        //                 <form action="" method="post" encType="multipart/form-data">
        //                     <div className="mt-3">
        //                         <div className="form-floating">
        //                             <input type="text" className="form-control" id="title" name="title"
        //                                    placeholder="글 제목"/>
        //                             <label htmlFor="title">글 제목</label>
        //                         </div>
        //                     </div>
        //                     <div className="mt-3">
        //                         <div className="form-floating">
        //                             <input type="text" className="form-control" id="create-id" name="createId"
        //                                    placeholder="사용자ID"/>
        //                             <label htmlFor="create-id">사용자ID</label>
        //                         </div>
        //                     </div>
        //                     <div className="mt-3">
        //                         <div className="form-floating">
        //                          <textarea className="form-control" id="contents" name="contents" rows="10" placeholder="글 내용"
        //                             style={{ height: "150px" }}></textarea>
        //                             <label htmlFor="contents">글 내용</label>
        //                         </div>
        //                     </div>
        //                     <div className="mt-3">
        //                         <label htmlFor="upload-files" className="form-label">이미지파일 : </label>
        //                         <input type="file" className="form-control" id="upload-files" name="file" multiple/>
        //                     </div>
        //                     <div className="mt-3 d-grid gap-2">
        //                         <button type="submit" className="btn btn-primary">등록</button>
        //                         <button type="reset" className="btn btn-secondary" id="btn-cancel">취소</button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </section>
        // </div>
    );
}

export default BlogWrite