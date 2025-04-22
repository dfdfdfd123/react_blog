package bitc.fullstack503.server.controller;

import bitc.fullstack503.server.dto.BoardDTO;
import bitc.fullstack503.server.dto.CommentDTO;
import bitc.fullstack503.server.service.BoardService;
import bitc.fullstack503.server.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "http://localhost:5173/write")
public class BlogController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private CommentService commentService;

    // 게시글 상세 조회
    @GetMapping("/{boardIdx}")
    public BoardDTO getBoardDetail(@PathVariable int boardIdx) {
        return boardService.getBoardDetail(boardIdx);
    }

    // 댓글 목록 조회
    @GetMapping("/{boardIdx}/comments")
    public List<CommentDTO> getComments(@PathVariable int boardIdx) {
        return commentService.getComments(boardIdx);
    }

    // 댓글 작성
    @PostMapping("/{boardIdx}/comments")
    public void addComment(@PathVariable int boardIdx, @RequestBody CommentDTO comment) {
        comment.setBoardIdx(boardIdx);
        commentService.addComment(comment);
    }

    // 댓글 수정
    @PutMapping("/comments/{commentIdx}")
    public void updateComment(@PathVariable int commentIdx, @RequestBody CommentDTO comment) {
        comment.setCommentIdx(commentIdx);
        commentService.updateComment(comment);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{commentIdx}")
    public void deleteComment(@PathVariable int commentIdx) {
        commentService.deleteComment(commentIdx);
    }
}
