package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.BoardDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {


    List<BoardDTO> getBoardList();

    BoardDTO getBoardDetail(int boardIdx) throws Exception;
    void insertBoard(BoardDTO board, List<MultipartFile> files) throws Exception;

//    글 수정
void updateBoard(BoardDTO board, List<MultipartFile> files) throws Exception;

// 글 삭제
void deleteBoard(int boardIdx) throws Exception;


List<BoardDTO> searchBlogs(String keyword);




}




