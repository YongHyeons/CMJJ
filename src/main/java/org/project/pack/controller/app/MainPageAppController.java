package org.project.pack.controller.app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.project.pack.classes.UD;
import org.project.pack.controller.api.OneDayClassApiController;
import org.project.pack.controller.api.WishListApiController;
import org.project.pack.entity.WishList;
import org.project.pack.repository.UserRepository;
import org.project.pack.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainPageAppController {
	
	@Autowired
	OneDayClassApiController odcapi;
	
	@Autowired
	WishListApiController wlApi;
	
	@Autowired
	UserRepository userRep;
	
	@Autowired
	WishListRepository wlRep;
	
	List<Long> firstLineCIds = List.of(125L,36L,35L,18L,24L,34L);
	List<Long> secondLineCIds = List.of(157L,117L,30L,3L,146L,137L);
	List<Long> thirdLineCIds = List.of(151L,156L,98L,140L,152L,13L);
	List<Long> fourthLineCIds = List.of(158L,51L,128L,44L,3L,39L);
	
	public List<Long> whichLine(Integer index){
		if(index == 1)return firstLineCIds;
		else if(index == 2) return secondLineCIds;
		else if(index == 3) return thirdLineCIds;
		else if(index == 4) return fourthLineCIds;
		return null;
	}
	
	@GetMapping("/main")
    public String mainPage(Model model,@AuthenticationPrincipal @Nullable UD ud){
        List<Long> wlIds = new ArrayList<>();
	    
	    if (ud != null) {
	        List<WishList> wlList = wlRep.findAllByUser_uId(ud.getUser().getUId());
	        wlList.forEach(wl -> wlIds.add(wl.getOnedayclass().getCId()));
	    }
        

        List<Long> allCIds = new ArrayList<Long>();
        allCIds.addAll(firstLineCIds);
        allCIds.addAll(secondLineCIds);
        allCIds.addAll(thirdLineCIds);
        allCIds.addAll(fourthLineCIds);


        List<Map<String,Object>> allOdcs = odcapi.getODCMaps(allCIds);

        List<Map<String, Object>> allClassDetails1 = new ArrayList<Map<String,Object>>();
        List<Map<String, Object>> allClassDetails2 = new ArrayList<Map<String,Object>>();
        List<Map<String, Object>> allClassDetails3 = new ArrayList<Map<String,Object>>();
        List<Map<String, Object>> allClassDetails4 = new ArrayList<Map<String,Object>>();

        for(Map<String,Object> odc : allOdcs){
        	
        	if (wlIds.contains(odc.get("cId"))) {
        		odc.put("isInWishlist", true);
        	} else {
        		odc.put("isInWishlist", false);
        	}
        	
            if(firstLineCIds.contains(odc.get("cId"))){
                allClassDetails1.add(odc);
            }
            else if(secondLineCIds.contains(odc.get("cId"))){
                allClassDetails2.add(odc);
            }
            else if(thirdLineCIds.contains(odc.get("cId"))){
                allClassDetails3.add(odc);
            }
            else if(fourthLineCIds.contains(odc.get("cId"))){
                allClassDetails4.add(odc);
            }
        }
        
        
        
        model.addAttribute("allClassDetails1",allClassDetails1);
        model.addAttribute("allClassDetails2",allClassDetails2);
        model.addAttribute("allClassDetails3",allClassDetails3);
        model.addAttribute("allClassDetails4",allClassDetails4);
        if(ud != null)model.addAttribute("uId",ud.getUser().getUId());
        model.addAttribute("wlIds", wlIds); 
        return "main";
    }
	
	
	
	
	
	
}
