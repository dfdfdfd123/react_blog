package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.BoardDTO;
import bitc.fullstack503.server.dto.FileDTO;
import bitc.fullstack503.server.mapper.BoardMapper;
import bitc.fullstack503.server.mapper.FileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public BoardDTO getBoardDetail(int boardIdx) {
        return boardMapper.selectBoardDetail(boardIdx);
    }

    @Override
    public void insertBoard(BoardDTO board, List<MultipartFile> files) throws Exception {
        boardMapper.insertBoard(board);

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String originalName = file.getOriginalFilename();
                    String storedName = UUID.randomUUID() + "_" + originalName;
                    String filePath = "C:/fullstack503/스프링개인프로젝트_임정민/SpringProject/src/main/resources/static/upload/";

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
}

