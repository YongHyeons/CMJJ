package org.project.pack.controller.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.project.pack.entity.OneDayClass;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.repository.WishListRepository;
import org.project.pack.services.OneDayClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/odc")
public class OneDayClassApiController {
	
	@Autowired
	OneDayClassRepository odcRep;
	
	@Autowired
	WishListRepository wlRep;
	
	@Autowired
	OneDayClassService oneDayClassService;
	
	@Autowired
	WishListApiController wlApi;
	
	Integer pageContentCount = 16;
	
    public Map<String, Object> getODCMap(Long cId, OneDayClass oneDayClass) {
        Map<String, Object> odcmap = new HashMap<>();
        odcmap.put("title", oneDayClass.getTitle());
        odcmap.put("classimagesaddr", oneDayClass.getImageAddr());
        odcmap.put("imageKey",oneDayClass.getImageKey());
        odcmap.put("classimagekeys", oneDayClass.getCImagesKeys());
        odcmap.put("classmainimage", oneDayClass.getImageAddr()+"/"+oneDayClass.getImageKey()+"/main.jpg");
        odcmap.put("classmaincategory", oneDayClass.getMaincategory().getName());
        odcmap.put("classsubcategory", oneDayClass.getSubcategory().getName().isEmpty() ? "" : oneDayClass.getSubcategory().getName());
        odcmap.put("hostname", oneDayClass.getUser().getName());
        odcmap.put("difficulty", oneDayClass.getDifficulty());
        odcmap.put("classprice", oneDayClass.getPrice());
        odcmap.put("rating", oneDayClass.getAvgRating());
        odcmap.put("classaddr", oneDayClass.getCAddr());
        return odcmap;
    }

    public List<Map<String, Object>> getClassesList(List<Long> cIds) {
        List<OneDayClass> classes = oneDayClassService.getOneDayClassesBycIds(cIds);
        return classes.stream().map(oneDayClass -> getODCMap(oneDayClass.getCId(), oneDayClass)).toList();
    }
	
    
    public List<Map<String, Object>> getODCMaps(List<Long> cIds) {
        List<OneDayClass> classes = odcRep.findAllBycIds(cIds);
        return classes.stream()
                      .map(c -> {
                          Map<String, Object> odcmap = new HashMap<>();
                          odcmap.put("cId",c.getCId());
                          odcmap.put("title", c.getTitle());
                          odcmap.put("classimagesaddr", c.getImageAddr());
                          odcmap.put("classimagekeys", c.getCImagesKeys());
                          odcmap.put("imageKey",c.getImageKey());
                          odcmap.put("classmainimage", c.getImageAddr()+"/"+ c.getImageKey() + "/main.jpg");
                          odcmap.put("imageAddr", c.getImageAddr());
                          odcmap.put("classmaincategory", c.getMaincategory().getName());
                          odcmap.put("classsubcategory", c.getSubcategory().getName().isEmpty() ? "" : c.getSubcategory().getName());
                          odcmap.put("hostname", c.getHNick());
                          odcmap.put("difficulty", c.getDifficulty());
                          odcmap.put("classprice", c.getPrice());
                          odcmap.put("rating", c.getAvgRating());
                          odcmap.put("classaddr", c.getCAddr());
                          return odcmap;
                      })
                      .collect(Collectors.toList());
    }
    
    
    @GetMapping("/getClasses")
    public Page<OneDayClass> getClassesPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "name") String sortBy) {
        return oneDayClassService.getClasses(page, pageContentCount, sortBy); 
    }
	
}
