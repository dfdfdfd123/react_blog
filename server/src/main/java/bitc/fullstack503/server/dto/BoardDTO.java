

// 블로그 게시글 테이블

package bitc.fullstack503.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class BoardDTO {

    private int boardIdx;
    private String title;
    private String contents;
    private int hitCnt;
    private String createId;
    private String createDate;
    private String updateId;
    private String updateDate;
    private int likeCnt;
    // 파일 목록 추가
    private List<FileDTO> fileList;

}

