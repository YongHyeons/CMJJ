package org.project.pack.controller.api;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.project.pack.classes.UD;
import org.project.pack.entity.MainCategory;
import org.project.pack.entity.OneDayClass;
import org.project.pack.entity.SubCategory;
import org.project.pack.repository.MainCategoryRepository;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.repository.SubCategoryRepository;
import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@RestController
@RequestMapping("/api")
public class RegistrationApiController {

    @Value("${upload.file.original}")
    private String originalPath;

    @Value("${upload.file.image}")
    private String imageExts;

    @Value("${upload.file.name.length}")
    private Integer randomNameLength;

    @Value("${curriculum.splitter}")
    private String splitter;
    
    @Autowired
    OneDayClassRepository odcRep;

    @Autowired
    MainCategoryRepository mcRep;

    @Autowired
    SubCategoryRepository scRep;

    @Autowired
    UserRepository uRep;

    
    private static final String UPLOAD_DIR = "uploads";
    private static final int MAX_FILES = 6;
    private int contentImageCount = 0;
    
    private Path rootLocation = Paths.get("src/main/resources/static/contentImages");
    private final Path rootLocation2 = Paths.get(UPLOAD_DIR);
    private static final String FILE_PREFIX = "sub";
    private final ConcurrentHashMap<String, AtomicInteger> fileIndices = new ConcurrentHashMap<>();
    private String getCurrentDatePath() {
        Date now = new Date();
        return (now.getYear() + 1900) + "/" + String.format("%02d", (now.getMonth() + 1)) + "/" + String.format("%02d", now.getDate());
    }

    private String getExt(String name) {
        int dotIndex = name.lastIndexOf('.');
        return (dotIndex != -1) ? name.substring(dotIndex + 1) : "unknown";
    }

    private String getFileName(String name) {
        int dotIndex = name.lastIndexOf('.');
        return (dotIndex != -1) ? name.substring(0, dotIndex) : name;
    }

    @PostMapping("/testupload/{key}")
    public ResponseEntity<String> handleFileUpload(
        @PathVariable("key") String key,
        @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\":\"No file selected\"}");
        }

        try {
        	String datePath = getCurrentDatePath();
            Path dropzoneLocation = rootLocation2.resolve(datePath).resolve(key);
            if (Files.notExists(dropzoneLocation)) {
                Files.createDirectories(dropzoneLocation);
            }

            AtomicInteger fileIndex = fileIndices.computeIfAbsent(key, k -> new AtomicInteger(1));
            
            String fileExtension = getExt(file.getOriginalFilename());
            String fileName;
            Path targetLocation;

            do {
                fileName = FILE_PREFIX + fileIndex.getAndIncrement() + "." + fileExtension;
                targetLocation = dropzoneLocation.resolve(fileName);
            } while (Files.exists(targetLocation));

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok("{\"message\":\"File uploaded successfully\", \"serverName\": \"" + fileName + "\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"Error uploading file\", \"error\": \"" + e.getMessage() + "\"}");
        }
    }



    @DeleteMapping("/delete/{key}/{filename:.+}")
    public ResponseEntity<String> handleFileDelete(@PathVariable String key, @PathVariable String filename) {
        try {
            String datePath = getCurrentDatePath();
            Path dropzoneLocation = Paths.get(UPLOAD_DIR, datePath, key);
            
            String decodedFilename = URLDecoder.decode(filename, StandardCharsets.UTF_8.name());
            
            Path fileToDelete = dropzoneLocation.resolve(decodedFilename).normalize();

            if (Files.exists(fileToDelete)) {
                Files.delete(fileToDelete);
                return ResponseEntity.ok("{\"message\":\"File deleted successfully: " + decodedFilename + "\"}");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\":\"File not found: " + decodedFilename + "\"}");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"Error deleting file: " + e.getMessage() + "\"}");
        }
    }


    @DeleteMapping("/clearFolder/{key}")
    public ResponseEntity<String> clearFolder(@PathVariable String key) {
        try {
            Path dropzoneLocation = Paths.get(UPLOAD_DIR, key);
            if (!Files.exists(dropzoneLocation)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\":\"Directory not found\"}");
            }

            try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(dropzoneLocation)) {
                for (Path path : directoryStream) {
                    Files.delete(path);
                }
            }

            Files.delete(dropzoneLocation);
            Files.createDirectories(dropzoneLocation);

            return ResponseEntity.ok("{\"message\":\"Folder cleared successfully\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"Error clearing folder: " + e.getMessage() + "\"}");
        }
    }


    private final ConcurrentHashMap<String, AtomicInteger> fileCounters = new ConcurrentHashMap<>();

    @PostMapping("/uploadImage/{randomKey}")
    public ResponseEntity<UploadResponse> handleImageUpload(
            @PathVariable("randomKey") String randomKey, 
            @RequestParam("file") MultipartFile file) {
        
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new UploadResponse("File is empty"));
        }

        if (!isValidImageFile(file)) {
            return ResponseEntity.badRequest().body(new UploadResponse("Invalid file type"));
        }

        try {
            Path clientFolder = rootLocation.resolve(randomKey);
            if (!Files.exists(clientFolder)) {
                Files.createDirectories(clientFolder);
            }

            AtomicInteger counter = fileCounters.computeIfAbsent(randomKey, k -> new AtomicInteger(1));
            int fileNumber = counter.getAndIncrement();
            
            String fileName = randomKey + fileNumber + "." + getExt(file.getOriginalFilename());
            Path destinationFile = clientFolder.resolve(fileName);

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/images/")
                    .path(randomKey + "/")
                    .path(fileName)
                    .toUriString();

            return ResponseEntity.ok(new UploadResponse(fileUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UploadResponse("Failed to store file"));
        }
    }

    private boolean isValidImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    @GetMapping("/images/{randomKey}/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String randomKey, @PathVariable String filename) {
        try {
            Path file = rootLocation.resolve(randomKey).resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(file);
                contentType = (contentType != null) ? contentType : "application/octet-stream";

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class UploadResponse {
        private String fileUrl;
    }

    @PostMapping("/mainImageUpload/{key}")
    public ResponseEntity<String> uploadFile(@PathVariable String key, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file!", HttpStatus.BAD_REQUEST);
        }

        try {
            String datePath = getCurrentDatePath();
            Path dropzoneLocation = Paths.get(UPLOAD_DIR, datePath, key);
            
            if (Files.notExists(dropzoneLocation)) {
                Files.createDirectories(dropzoneLocation);
            }

            String fileExtension = getExt(file.getOriginalFilename());
            Path path = dropzoneLocation.resolve("main." + fileExtension);

            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return new ResponseEntity<>(path.toString(), HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File upload failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/hostImageUpload/{key}")
    public ResponseEntity<String> hostupload(@PathVariable String key, @RequestParam("profile") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file!", HttpStatus.BAD_REQUEST);
        }

        try {
            String datePath = getCurrentDatePath();
            Path dropzoneLocation = Paths.get(UPLOAD_DIR, datePath, key);
            
            if (Files.notExists(dropzoneLocation)) {
                Files.createDirectories(dropzoneLocation);
            }

            String fileExtension = getExt(file.getOriginalFilename());
            Path path = dropzoneLocation.resolve("host." + fileExtension);

            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return new ResponseEntity<>(path.toString(), HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File upload failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
  @PostMapping("/saveContent/{key}")
  public ResponseEntity<Void> saveContent(@RequestBody ContentRequest contentRequest
  		, @AuthenticationPrincipal @Nullable UD ud
  		, @PathVariable String key) {
	  OneDayClass my_odc = new OneDayClass();
      String insert_title = contentRequest.getForm().getTitle();
      String insert_mainCName = contentRequest.getForm().getMainCName();
      String insert_subCName = contentRequest.getForm().getSubCName();
      String insert_addrDetail = contentRequest.getForm().getAddrDetail();
      Integer insert_difficulty = Integer.parseInt((contentRequest.getForm().getDifficulty())) ;
      Integer insert_price = Integer.parseInt((contentRequest.getForm().getPrice().replace(",", "")));
      Integer time_taken = Integer.parseInt((contentRequest.getForm().getTimeTaken()));
      String curriculum = contentRequest.getForm().getStep1()
              + (!contentRequest.getForm().getStep2().isEmpty() ? splitter : "")
              + contentRequest.getForm().getStep2()
              + (!contentRequest.getForm().getStep3().isEmpty() ? splitter : "")
              + contentRequest.getForm().getStep3()
              + (!contentRequest.getForm().getStep4().isEmpty() ? splitter : "")
              + contentRequest.getForm().getStep4()
              + (!contentRequest.getForm().getStep5().isEmpty() ? splitter : "")
              + contentRequest.getForm().getStep5();
      String insert_selectedAddress = contentRequest.getForm().getSelectedAddress();
      LocalDate regDate = LocalDate.now();
      String insert_description = contentRequest.getContent();
      String insert_hostIntro = contentRequest.getForm().getHostIntro();
      String insert_hostNick = contentRequest.getForm().getHostNick();
      String insert_phonenumber = contentRequest.getForm().getPhonenumber();
      
      MainCategory insert_mc = new MainCategory(mcRep.findByName(insert_mainCName).getMainCategoryId(), null);
      SubCategory insert_sc = new SubCategory(scRep.findByName(insert_subCName).getSubCategoryId(), null, null);

      String datePath = getCurrentDatePath();
      Path directoryPath = Paths.get(UPLOAD_DIR, datePath, key);
      System.out.println(ud.getUser().getUId());

      StringBuilder totalFileBuilder = new StringBuilder();
      String totalFile = "";
      try {
          List<String> fileNames = getFileNamesInDirectory(directoryPath);

          for (String fileName : fileNames) {
              if (!getFileName(fileName).equals("main")) {
              	if (!getFileName(fileName).equals("host")) {
              		totalFileBuilder.append(key); 
              	}
              }
              totalFileBuilder.append(getFileName(fileName));
              System.out.println("File name: " + fileName); 
          }

          totalFile = totalFileBuilder.toString();
      } catch (IOException e) {
          e.printStackTrace();
          System.err.println("Error occurred while listing files: " + e.getMessage());
      }

      my_odc.setCId(null);
      my_odc.setTitle(insert_title);
      my_odc.setDescription(insert_description);
      my_odc.setCAddr(insert_selectedAddress);
      my_odc.setCAddrDetail(insert_addrDetail);
      my_odc.setRegDate(regDate);
      my_odc.setPrice(insert_price);
      my_odc.setAvgRating(0.0);
      my_odc.setIsClosed(true);
      my_odc.setDifficulty(insert_difficulty);
      my_odc.setUser(ud.getUser());
      my_odc.setMaincategory(insert_mc);
      my_odc.setSubcategory(insert_sc);
      my_odc.setDuration(time_taken);
      my_odc.setCurriculum(curriculum);
      my_odc.setImageAddr(directoryPath.toString());
      my_odc.setImageKey(key);
      my_odc.setCImagesKeys(totalFile);
      my_odc.setHIntro(insert_hostIntro);
      my_odc.setHNick(insert_hostNick);
      my_odc.setPhnum(insert_phonenumber);
      System.out.println(key);
      odcRep.save(my_odc);

      return ResponseEntity.ok().build();
  }
  
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  static class ContentRequest {
      private String content;
      private Form form;
      @Data
      @NoArgsConstructor
      @AllArgsConstructor
      public class Form {
          private String title;
          private String mainCName;
          private String subCName;
          private String addrDetail;
          private String difficulty;
          private String price;
          private String timeTaken;
          private String step1;
          private String step2;
          private String step3;
          private String step4;
          private String step5;
          private String selectedAddress;
          private String hostIntro;
          private String phonenumber;
          private String hostNick;
      }
  }
  
  private List<String> getFileNamesInDirectory(Path directoryPath) throws IOException {
      List<String> fileNames = new ArrayList<>();
      try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(directoryPath)) {
          for (Path path : directoryStream) {
              if (Files.isRegularFile(path)) {
                  fileNames.add(path.getFileName().toString());
              }
          }
      }
      return fileNames;
  }
}
