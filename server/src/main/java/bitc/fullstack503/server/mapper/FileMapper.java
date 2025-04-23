package bitc.fullstack503.server.mapper;

import bitc.fullstack503.server.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
    void insertFile(FileDTO fileDTO);

    FileDTO selectFileByStoredName(String storedName);
    int deleteFileByStoredName(String storedName);

    void deleteFilesByBoardIdx(int boardIdx);

}
