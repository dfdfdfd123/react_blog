package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.CommentDTO;
import bitc.fullstack503.server.mapper.CommentMapper;
import bitc.fullstack503.server.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public List<CommentDTO> getComments(int boardIdx) {
        return commentMapper.selectCommentsByBoardIdx(boardIdx);
    }

    @Override
    public void addComment(CommentDTO comment) {
        commentMapper.insertComment(comment);
    }

    @Override
    public void updateComment(CommentDTO comment) {
        commentMapper.updateComment(comment);
    }

    @Override
    public void deleteComment(int commentIdx) {
        commentMapper.deleteComment(commentIdx);
    }
}