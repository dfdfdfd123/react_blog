package bitc.fullstack503.server.dto;

import lombok.Data;

@Data
public class FileDTO {
    private int fileIdx;
    private int boardIdx;
    private String originalName;
    private String storedName;
    private String filePath;
}
