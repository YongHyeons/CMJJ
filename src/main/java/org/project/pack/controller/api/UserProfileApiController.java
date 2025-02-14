package org.project.pack.controller.api;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.project.pack.classes.UD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.ServletContext;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserProfileApiController {

    @Autowired
    private ServletContext context;

    @PostMapping("/uploadprofile")
    public ResponseEntity<Map<String, String>> handleFileUpload(
            @RequestParam("image") MultipartFile file,
            @AuthenticationPrincipal UD ud) {
        
        Map<String, String> response = new HashMap<>();

        if (file.isEmpty()) {
            response.put("message", "파일이 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String realPath = context.getRealPath("/");
            String uploadDir = realPath + "user_profile_uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

           
            String fileName = ud.getUser().getUId().toString() + ".jpg";
            File destinationFile = uploadPath.resolve(fileName).toFile();
            file.transferTo(destinationFile);

            response.put("message", "파일이 성공적으로 업로드되었습니다.");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "파일 업로드 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
