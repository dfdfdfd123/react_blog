package bitc.fullstack503.server.dto;

import lombok.Data;


@Data
public class CommentDTO {
    private int commentIdx;
    private int boardIdx; //  FOREIGN KEY (board_id) REFERENCES blog_board(boardIdx) ON DELETE CASCADE 로 외래키화 함.
    private String userId;
    private String content;
    private String createdAt;
    private String updateId;
    private String updateDate;
}