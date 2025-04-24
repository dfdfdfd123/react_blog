package bitc.fullstack503.server.service;

import bitc.fullstack503.server.dto.FileDTO;
import bitc.fullstack503.server.mapper.CommentMapper;
import bitc.fullstack503.server.mapper.FileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Override
    public void deleteFile(String storedName) throws Exception {
        FileDTO file = fileMapper.selectFileByStoredName(storedName);
        if (file != null) {
            // 실제 파일 삭제
//            File f = new File("C:/Users/user/Documents/react_blog/server/src/main/resources/static" + file.getFilePath());
            File f = new File("C:/fullstack503/reast/react_blog/server/src/main/resources/static" + file.getFilePath());
            if (f.exists()) f.delete();

            // DB 삭제
            fileMapper.deleteFileByStoredName(storedName);
        }
    }

}
