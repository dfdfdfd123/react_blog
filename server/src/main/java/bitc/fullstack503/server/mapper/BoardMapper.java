package bitc.fullstack503.server.mapper;

import bitc.fullstack503.server.dto.BoardDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    BoardDTO selectBoardDetail(int boardIdx);

    // 이후 기능 확장 시 아래도 추가 가능
     void insertBoard(BoardDTO board);
     void updateBoard(BoardDTO board);
     void deleteBoard(int boardIdx);

}
