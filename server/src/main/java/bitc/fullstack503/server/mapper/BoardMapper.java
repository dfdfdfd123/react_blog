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

    // 파일을 포함한 게시글 목록 조회
//    BoardDTO selectBoardDetail(@Param("boardIdx") int boardIdx);  // 게시글 상세 조회

//    글 상세보기
    BoardDTO selectBoardDetail(int boardIdx);
    List<FileDTO> selectFilesByBoardIdx(int boardIdx);


    // 이후 기능 확장 시 아래도 추가 가능
     void insertBoard(BoardDTO board);
     void updateBoard(BoardDTO board);
     void deleteBoard(int boardIdx);



    List<BoardDTO> searchBlogs(@Param("keyword") String keyword);



}
