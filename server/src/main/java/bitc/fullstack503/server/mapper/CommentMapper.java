package bitc.fullstack503.server.mapper;

import bitc.fullstack503.server.dto.CommentDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    List<CommentDTO> selectCommentsByBoardIdx(int boardIdx);
    void insertComment(CommentDTO comment);
    void updateComment(CommentDTO comment);
    void deleteComment(int commentIdx);

}
