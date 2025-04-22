package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.BoardDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    BoardDTO getBoardDetail(int boardIdx);
    void insertBoard(BoardDTO board, List<MultipartFile> files) throws Exception;
}




