package bitc.fullstack503.server.controller;

import bitc.fullstack503.server.dto.BoardDTO;
import bitc.fullstack503.server.dto.CommentDTO;
import bitc.fullstack503.server.dto.FileDTO;
import bitc.fullstack503.server.mapper.BoardMapper;
import bitc.fullstack503.server.service.BoardService;
import bitc.fullstack503.server.service.CommentService;
import bitc.fullstack503.server.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin({"http://localhost:5173"})
@RestController
@RequestMapping("/api/blog")
public class BlogController {



    @Autowired
    private BoardService boardService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private FileService fileService;


    @GetMapping("/ping")
    public String ping() {
        return "서버 연결 성공!";
    }

    @GetMapping("/list")
    public ResponseEntity<List<BoardDTO>> getBoardList() {
        return ResponseEntity.ok(boardService.getBoardList());
    }

//    @GetMapping("/detail")
//    public ResponseEntity<BoardDTO> getBoardDetail(@RequestParam int id) {
//        return ResponseEntity.ok(boardService.getBoardDetail(id));
//    }

    // 게시글 상세 조회
    @GetMapping("/{boardIdx}")
    public BoardDTO getBoardDetail(@PathVariable int boardIdx) throws Exception {
        return boardService.getBoardDetail(boardIdx);
    }

    /**
     * 게시글 작성 + 첨부파일 업로드
     */
    @PostMapping("/write")
    public ResponseEntity<String> insertBlog(@RequestParam("title") String title,
                                             @RequestParam("createId") String createId,
                                             @RequestParam("contents") String contents,
                                             @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        try {
            BoardDTO board = new BoardDTO();
            board.setTitle(title);
            board.setCreateId(createId);
            board.setContents(contents);

            boardService.insertBoard(board, files);

            return ResponseEntity.ok("글 작성 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글 작성 실패");
        }
    }

//    글 수정

    @PutMapping("/post/{boardIdx}")
    public ResponseEntity<?> updateBoard(@PathVariable int boardIdx,
                                         @ModelAttribute BoardDTO board,
                                         @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        try {
            board.setBoardIdx(boardIdx);
            boardService.updateBoard(board, files);
            return ResponseEntity.ok().body("수정 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 실패: " + e.getMessage());
        }
    }

//    첨부 파일 삭제
    @DeleteMapping("/file/{storedName}")
    public ResponseEntity<?> deleteFile(@PathVariable String storedName) {
        try {
            fileService.deleteFile(storedName);
            return ResponseEntity.ok().body("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패: " + e.getMessage());
        }
    }

//    글 삭제
@DeleteMapping("/delete/{boardIdx}")
public ResponseEntity<?> deleteBoard(@PathVariable int boardIdx) {
    try {
        boardService.deleteBoard(boardIdx);
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패: " + e.getMessage());
    }
}

// 글 검색

    // BlogController.java

    @GetMapping("/search")
    public ResponseEntity<List<BoardDTO>> searchBlogs(@RequestParam String keyword) {
        try {
            List<BoardDTO> result = boardService.searchBlogs(keyword);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




    //     댓글 목록 조회
    @GetMapping("/{boardIdx}/comments")
    public List<CommentDTO> getComments(@PathVariable int boardIdx) {
        return commentService.getComments(boardIdx);
    }

    // 댓글 작성
    @PostMapping("/{boardIdx}/comments")
    public void addComment(@PathVariable int boardIdx, @RequestBody CommentDTO comment) {
        comment.setBoardId(boardIdx);
        commentService.addComment(comment);
    }


    // 댓글 수정
    @PutMapping("/comments/{commentId}")
    public void updateComment(@PathVariable int commentId, @RequestBody CommentDTO comment) {
        System.out.println("업데이트할 댓글: " + comment); // 확인
        comment.setCommentId(commentId);
        commentService.updateComment(comment);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable int commentId) {
        commentService.deleteComment(commentId);
    }
}
