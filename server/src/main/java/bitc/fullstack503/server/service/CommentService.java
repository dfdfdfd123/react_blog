package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.CommentDTO;

import java.util.List;

public interface CommentService {
    List<CommentDTO> getComments(int boardIdx);
    void addComment(CommentDTO comment);
    void updateComment(CommentDTO comment);
    void deleteComment(int commentIdx);
}

