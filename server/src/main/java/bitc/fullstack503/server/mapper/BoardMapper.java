package bitc.fullstack503.server.mapper;

import bitc.fullstack503.server.dto.BoardDTO;
import bitc.fullstack503.server.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardMapper {


    List<BoardDTO> selectBoardWithFiles();

//    글 상세보기
    BoardDTO selectBoardDetail(int boardIdx);
    List<FileDTO> selectFilesByBoardIdx(int boardIdx);


    // 이후 기능 확장 시 아래도 추가 가능
     void insertBoard(BoardDTO board);
     void updateBoard(BoardDTO board);
     void deleteBoard(int boardIdx);


    void updateHitCnt(@Param("boardIdx") int boardIdx) throws Exception;
    List<BoardDTO> searchBlogs(@Param("keyword") String keyword);



}
