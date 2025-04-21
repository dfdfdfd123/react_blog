function BlogWrite() {
    return (
        <div>
            <section>
                <div className="row mt-3">
                    <div className="col-sm-4 mx-auto">
                        <form action="" method="post" encType="multipart/form-data">
                            <div className="mt-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="title" name="title"
                                           placeholder="글 제목"/>
                                    <label htmlFor="title">글 제목</label>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="create-id" name="createId"
                                           placeholder="사용자ID"/>
                                    <label htmlFor="create-id">사용자ID</label>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="form-floating">
                                    <textarea className="form-control" id="contents" name="contents" row="10"
                                              placeholder="글 내용" style="height: 150px;"></textarea>
                                    <label htmlFor="contents">글 내용</label>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="upload-files" className="form-label">이미지파일 : </label>
                                <input type="file" className="form-control" id="upload-files" name="file" multiple/>
                            </div>
                            <div className="mt-3 d-grid gap-2">
                                <button type="submit" className="btn btn-primary">등록</button>
                                <button type="reset" className="btn btn-secondary" id="btn-cancel">취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BlogWrite