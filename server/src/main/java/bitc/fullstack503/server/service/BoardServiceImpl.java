package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.BoardDTO;
import bitc.fullstack503.server.dto.FileDTO;
import bitc.fullstack503.server.mapper.BoardMapper;
import bitc.fullstack503.server.mapper.FileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;
    private final FileMapper fileMapper;


    @Override
    public List<BoardDTO> getBoardList() {
        return boardMapper.selectBoardWithFiles();
    }

// 글 상세 보기
    @Override
    public BoardDTO getBoardDetail(int boardIdx) throws Exception {


        boardMapper.updateHitCnt(boardIdx);


        BoardDTO board = boardMapper.selectBoardDetail(boardIdx);

        if (board != null) {

            List<FileDTO> fileList = boardMapper.selectFilesByBoardIdx(boardIdx);
            board.setFileList(fileList);
        }

        return board;

    }

//    글 작성
    @Override
    public void insertBoard(BoardDTO board, List<MultipartFile> files) throws Exception {
        boardMapper.insertBoard(board);

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String originalName = file.getOriginalFilename();
                    String storedName = UUID.randomUUID() + "_" + originalName;
                    String filePath = "C:/Users/user/Documents/react_blog/server/src/main/resources/static/upload/";
//                    String filePath = "C:/fullstack503/reast/react_blog/server/src/main/resources/static/upload/";

                    File dest = new File(filePath + storedName);
                    file.transferTo(dest);

                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setBoardIdx(board.getBoardIdx());
                    fileDTO.setOriginalName(originalName);
                    fileDTO.setStoredName(storedName);
                    fileDTO.setFilePath("/upload/" + storedName);
                    fileMapper.insertFile(fileDTO);
                }
            }
        }
    }

    // 글 수정

    @Override
    public void updateBoard(BoardDTO board, List<MultipartFile> files) throws Exception {
        boardMapper.updateBoard(board);

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String originalName = file.getOriginalFilename();
                    String storedName = UUID.randomUUID() + "_" + originalName;
                    String filePath = "C:/Users/user/Documents/react_blog/server/src/main/resources/static/upload/";
//                    String filePath = "C:/fullstack503/reast/react_blog/server/src/main/resources/static/upload/";

                    File dest = new File(filePath + storedName);
                    file.transferTo(dest);

                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setBoardIdx(board.getBoardIdx());
                    fileDTO.setOriginalName(originalName);
                    fileDTO.setStoredName(storedName);
                    fileDTO.setFilePath("/upload/" + storedName);
                    fileMapper.insertFile(fileDTO);
                }
            }
        }
    }

//    글 삭제
@Override
public void deleteBoard(int boardIdx) throws Exception {
    // 1. 파일 리스트 조회
    List<FileDTO> fileList = boardMapper.selectFilesByBoardIdx(boardIdx);

    // 2. 파일 시스템에서 삭제
    if (fileList != null && !fileList.isEmpty()) {
        for (FileDTO file : fileList) {
            String fullPath = "C:/Users/user/Documents/react_blog/server/src/main/resources/static" + file.getFilePath();
//            String fullPath = "C:/fullstack503/reast/react_blog/server/src/main/resources/static" + file.getFilePath();
            File targetFile = new File(fullPath);
            if (targetFile.exists()) {
                targetFile.delete();
            }
        }
    }

    // 3. 파일 테이블에서 삭제
    fileMapper.deleteFilesByBoardIdx(boardIdx);

    // 4. 게시글 논리 삭제
    boardMapper.deleteBoard(boardIdx);
}

// 글 검색
    @Override
    public List<BoardDTO> searchBlogs(String keyword) {
        return boardMapper.searchBlogs(keyword);
    }

}



