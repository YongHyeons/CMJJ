package org.project.pack.controller.api;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

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
public class ModificationApiController {

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
    
    private Path rootLocation = Paths.get("src/main/resources/static/contentImages");
    private final Path rootLocation2 = Paths.get(UPLOAD_DIR);
    private static final String FILE_PREFIX = "sub";
    private final ConcurrentHashMap<String, AtomicInteger> fileIndices = new ConcurrentHashMap<>();

    private String getExt(String name) {
        int dotIndex = name.lastIndexOf('.');
        return (dotIndex != -1) ? name.substring(dotIndex + 1) : "unknown";
    }

    private String getFileName(String name) {
        int dotIndex = name.lastIndexOf('.');
        return (dotIndex != -1) ? name.substring(0, dotIndex) : name;
    }

    // 파일 업로드 처리
    @PostMapping("/modzoneupload/{key}")
    public ResponseEntity<String> handleFileUpload(
        @PathVariable("key") String key,
        @RequestParam("file") MultipartFile file,
        @RequestParam("year") String year,
        @RequestParam("month") String month,
        @RequestParam("day") String day) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\":\"No file selected\"}");
        }

        try {
            // 클라이언트로부터 받은 연도, 월, 일을 사용하여 경로를 설정
            Path dropzoneLocation = rootLocation2.resolve(Paths.get(year, month, day, key));
            
            if (Files.notExists(dropzoneLocation)) {
                Files.createDirectories(dropzoneLocation);
            }

            // 파일 인덱스를 가져오거나 초기화
            AtomicInteger fileIndex = fileIndices.computeIfAbsent(key, k -> new AtomicInteger(1));
            
            String fileExtension = getExt(file.getOriginalFilename());
            String fileName;
            Path targetLocation;

            // 중복되지 않는 파일 이름 생성
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


    @GetMapping("/modfiles/{year}/{month}/{day}/{randomKey}")
    public ResponseEntity<List<Map<String, String>>> getFiles(
        @PathVariable String year,
        @PathVariable String month,
        @PathVariable String day,
        @PathVariable String randomKey) {

        try {
            // 디렉토리 경로를 연도, 월, 일로 나누어 구성합니다.
            Path directoryPath = Paths.get("uploads", year, month, day, randomKey);

            if (!Files.exists(directoryPath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }

            List<Map<String, String>> fileInfoList = Files.list(directoryPath)
                .filter(Files::isRegularFile)
                .map(path -> {
                    String fileName = path.getFileName().toString();
                    if (fileName.startsWith("sub")) { // "sub"로 시작하는 파일만 필터링
                        String fileUrl = String.format("/modfiles/%s/%s/%s/%s/%s", year, month, day, randomKey, fileName);
                        Map<String, String> fileInfo = new HashMap<>();
                        fileInfo.put("name", fileName);
                        fileInfo.put("url", fileUrl);
                        return fileInfo;
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());


            return ResponseEntity.ok(fileInfoList);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    
    @GetMapping("/modfiles/{year}/{month}/{day}/{randomKey}/{fileName}")
    public ResponseEntity<Resource> getFile(
        @PathVariable String year,
        @PathVariable String month,
        @PathVariable String day,
        @PathVariable String randomKey,
        @PathVariable String fileName) {

        Path filePath = Paths.get("uploads", year, month, day, randomKey, fileName);
        if (Files.exists(filePath)) {
            try {
                Resource fileResource = new UrlResource(filePath.toUri());
                String contentType = Files.probeContentType(filePath);
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                    .body(fileResource);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/moddeleteFiles/{randomKey}")
    public ResponseEntity<String> deleteFiles(
        @PathVariable String randomKey, 
        @RequestBody Map<String, Object> requestBody) {

        // deletedFiles는 List<String> 형식으로 기대됩니다.
        List<String> deletedFiles = (List<String>) requestBody.get("deletedFiles");
        String year = (String) requestBody.get("year");
        String month = (String) requestBody.get("month");
        String day = (String) requestBody.get("day");

        // 기본 경로에 year, month, day를 포함시켜서 경로를 만듭니다.
        String basePath = "uploads/" + year + "/" + month + "/" + day + "/" + randomKey;

        for (String fileName : deletedFiles) {
            Path filePath = Paths.get(basePath, fileName);
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete " + fileName);
            }
        }

        return ResponseEntity.ok("Files deleted successfully");
    }


 // 클래스 필드에 파일 번호를 관리하는 맵을 추가
    private final ConcurrentHashMap<String, AtomicInteger> fileCounters = new ConcurrentHashMap<>();

    @PostMapping("/moduploadImage/{randomKey}")
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
            // 각 클라이언트의 랜덤 키로 된 폴더 경로 생성
            Path clientFolder = rootLocation.resolve(randomKey);
            if (!Files.exists(clientFolder)) {
                Files.createDirectories(clientFolder);
            }

            // 랜덤 키에 대한 파일 번호를 가져오거나 초기화
            AtomicInteger counter = fileCounters.computeIfAbsent(randomKey, k -> new AtomicInteger(1));
            int fileNumber = counter.getAndIncrement();
            
            // 파일 이름 생성: 랜덤키값1.jpg, 랜덤키값2.jpg 등
            String fileName = randomKey + fileNumber + "." + getExt(file.getOriginalFilename());
            Path destinationFile = clientFolder.resolve(fileName);

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

//            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
//                    .path("/api/images/")
//                    .path(randomKey + "/")
//                    .path(fileName)
//                    .toUriString();
            String fileUrl = String.format("/api/modimages/%s/%s", randomKey, fileName);
            return ResponseEntity.ok(new UploadResponse(fileUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UploadResponse("Failed to store file"));
        }
    }


    

    // 이미지 파일 유효성 검사
    private boolean isValidImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    // 이미지 파일 제공
    @GetMapping("/modimages/{randomKey}/{filename:.+}")
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

    @PostMapping("/modmainImageUpload/{key}")
    public ResponseEntity<String> uploadMainImage(
            @PathVariable String key, 
            @RequestParam("file") MultipartFile file,
            @RequestParam String year,
            @RequestParam String month,
            @RequestParam String day) {
        
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file!", HttpStatus.BAD_REQUEST);
        }

        try {
            Path dropzoneLocation = Paths.get(UPLOAD_DIR, year, month, day, key);

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

    @PostMapping("/moddeleteMainFiles/{randomKey}")
    public ResponseEntity<String> deleteMainFiles(
        @PathVariable String randomKey, 
        @RequestBody Map<String, String> params) {

        String year = params.get("year");
        String month = params.get("month");
        String day = params.get("day");

        if (year == null || month == null || day == null) {
            return ResponseEntity.badRequest().body("Missing date parameters");
        }

        String prefix = params.get("prefix");
        if (prefix == null) {
            return ResponseEntity.badRequest().body("Missing prefix parameter");
        }

        // 파일 삭제 로직 수행
        String basePath = "uploads/" + year + "/" + month + "/" + day + "/" + randomKey;
        try {
            Path directoryPath = Paths.get(basePath);
            Files.walk(directoryPath)
                 .filter(path -> path.getFileName().toString().startsWith(prefix))
                 .forEach(path -> {
                     try {
                         Files.delete(path);
                     } catch (IOException e) {
                         e.printStackTrace();
                     }
                 });
            return ResponseEntity.ok("Main files deleted successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting files");
        }
    }

    @GetMapping("/modmainImage/{randomKey}")
    public ResponseEntity<Resource> getMainImage(@PathVariable String randomKey, 
                                                 @RequestParam String year,
                                                 @RequestParam String month,
                                                 @RequestParam String day) {
        try {
            Path directoryPath = Paths.get(UPLOAD_DIR, year, month, day, randomKey);
            DirectoryStream<Path> stream = Files.newDirectoryStream(directoryPath, "main.*");

            for (Path file : stream) {
                Resource resource = new UrlResource(file.toUri());
                if (resource.exists() && resource.isReadable()) {
                    String contentType = Files.probeContentType(file);
                    contentType = contentType != null ? contentType : "application/octet-stream";
                    return ResponseEntity.ok()
                            .contentType(MediaType.parseMediaType(contentType))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                            .body(resource);
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PostMapping("/modhostImageUpload/{key}")
    public ResponseEntity<String> uploadHostImage(
            @PathVariable String key, 
            @RequestParam("file") MultipartFile file,
            @RequestParam String year,
            @RequestParam String month,
            @RequestParam String day) {

        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file!", HttpStatus.BAD_REQUEST);
        }

        try {
            Path dropzoneLocation = Paths.get(UPLOAD_DIR, year, month, day, key);

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


    @GetMapping("/modhostImage/{randomKey}")
    public ResponseEntity<Resource> getHostImage(@PathVariable String randomKey, 
                                                 @RequestParam String year,
                                                 @RequestParam String month,
                                                 @RequestParam String day) {
        try {
            Path directoryPath = Paths.get(UPLOAD_DIR, year, month, day, randomKey);
            DirectoryStream<Path> stream = Files.newDirectoryStream(directoryPath, "host.*");

            for (Path file : stream) {
                Resource resource = new UrlResource(file.toUri());
                if (resource.exists() && resource.isReadable()) {
                    String contentType = Files.probeContentType(file);
                    contentType = contentType != null ? contentType : "application/octet-stream";
                    return ResponseEntity.ok()
                            .contentType(MediaType.parseMediaType(contentType))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                            .body(resource);
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
  @PostMapping("/modsaveContent/{key}")
  public ResponseEntity<Void> saveContent(@RequestBody ContentRequest contentRequest
  		, @AuthenticationPrincipal @Nullable UD ud
  		, @PathVariable String key) {
	  
	  OneDayClass my_odc = odcRep.findByImageKey(key);
	  
      // 서버에서 콘솔에 출력
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
      String insert_description = contentRequest.getContent();
      String insert_hostIntro = contentRequest.getForm().getHostIntro();
      String insert_hostNick = contentRequest.getForm().getHostNick();
      String insert_phonenumber = contentRequest.getForm().getPhonenumber();
      
      MainCategory insert_mc = new MainCategory(mcRep.findByName(insert_mainCName).getMainCategoryId(), null);
      SubCategory insert_sc = new SubCategory(scRep.findByName(insert_subCName).getSubCategoryId(), null, null);
      LocalDate regdate = my_odc.getRegDate();
      String year = String.valueOf(regdate.getYear());
      String month = String.format("%02d", regdate.getMonthValue());
      String day = String.format("%02d", regdate.getDayOfMonth());
      String datepath = year + "/" + month + "/" + day;
      
      Path directoryPath = Paths.get(UPLOAD_DIR, datepath, key);
//       StringBuilder를 사용하여 파일 이름을 이어붙임
      StringBuilder totalFileBuilder = new StringBuilder();
      String totalFile = "";
      try {
          // 파일 이름을 가져오는 메서드 호출
          List<String> fileNames = getFileNamesInDirectory(directoryPath);

          // foreach 루프를 사용하여 파일 이름 출력
          for (String fileName : fileNames) {
              if (!getFileName(fileName).equals("main")) {
              	if (!getFileName(fileName).equals("host")) {
              		totalFileBuilder.append(key); // 파일 이름을 StringBuilder에 추가
              	}
              }
              totalFileBuilder.append(getFileName(fileName)); // 파일 이름을 StringBuilder에 추가
          }

          // 최종 결과 문자열 출력
          totalFile = totalFileBuilder.toString();
      } catch (IOException e) {
          e.printStackTrace();
      }

      my_odc.setTitle(insert_title);
      my_odc.setDescription(insert_description);
      my_odc.setCAddr(insert_selectedAddress);
      my_odc.setCAddrDetail(insert_addrDetail);
      my_odc.setPrice(insert_price);
      my_odc.setIsClosed(true);
      my_odc.setDifficulty(insert_difficulty);
      my_odc.setUser(ud.getUser());
      my_odc.setMaincategory(insert_mc);
      my_odc.setSubcategory(insert_sc);
      my_odc.setDuration(time_taken);
      my_odc.setCurriculum(curriculum);
      my_odc.setCImagesKeys(totalFile);
      my_odc.setHIntro(insert_hostIntro);
      my_odc.setHNick(insert_hostNick);
      my_odc.setPhnum(insert_phonenumber);
      
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
  
  
  
  
  @GetMapping("/getInitialContent/{randomKey}")
  public ResponseEntity<Map<String, Object>> getInitialContent(@PathVariable String randomKey) {
      Map<String, Object> response = new HashMap<>();
      List<String> imageUrls = new ArrayList<>();

      try {
          // 주어진 randomKey에 해당하는 contentImages 디렉토리 경로를 생성
          Path contentPath = rootLocation.resolve(randomKey);
          
          // 디렉토리가 존재하는지 확인
          if (Files.exists(contentPath) && Files.isDirectory(contentPath)) {
              // 디렉토리 내 파일들을 반복하여 확인
              try (DirectoryStream<Path> stream = Files.newDirectoryStream(contentPath)) {
                  for (Path file : stream) {
                      if (Files.isRegularFile(file)) {
                          String fileName = file.getFileName().toString();
                          // 각 파일의 URL을 리스트에 추가
                          String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                                  .path("/api/modimages/")  // 이미지를 제공하는 엔드포인트를 통해 URL 생성
                                  .path(randomKey + "/")
                                  .path(fileName)
                                  .toUriString();
                          imageUrls.add(fileUrl);
                      }
                  }
              }
          }
          
          // 현재는 텍스트 콘텐츠를 모킹(mocking)함 (필요 시 데이터베이스에서 가져올 수 있습니다)
          String textContent = odcRep.findByImageKey(randomKey).getDescription();
          // 응답 맵에 텍스트와 이미지 정보를 추가
          response.put("content", textContent);
          response.put("images", imageUrls);
          
          return ResponseEntity.ok(response);
      } catch (IOException e) {
          e.printStackTrace();
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyMap());
      }
  }
  @PostMapping("/deleteOldImages/{randomKey}")
  public ResponseEntity<?> deleteOldImages(@PathVariable String randomKey, @RequestBody Map<String, Object> request) {
      List<String> imageUrls = (List<String>) request.get("images");

      // 날짜 경로를 포함시키지 않고 rootLocation만 사용하여 이미지 경로를 설정
      Path clientFolder = rootLocation.resolve(randomKey);

      try {
          for (String imageUrl : imageUrls) {
        	  // URL에서 파일 이름을 추출합니다.
              String fileName = Paths.get(imageUrl).getFileName().toString();
              
              // 추출한 파일 이름을 사용해 상대 경로를 만듭니다.
              Path fileToDelete = clientFolder.resolve(fileName);

              if (Files.exists(fileToDelete)) {
                  Files.delete(fileToDelete);
              } else {
                  System.out.println("File not found: " + fileToDelete);
              }
          }
          return ResponseEntity.ok("Old images deleted successfully");
      } catch (IOException e) {
          e.printStackTrace();
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting files");
      }
  }
  
}
