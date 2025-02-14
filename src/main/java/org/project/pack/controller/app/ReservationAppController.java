package org.project.pack.controller.app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.project.pack.classes.Methods;
import org.project.pack.classes.UD;
import org.project.pack.entity.OneDayClass;
import org.project.pack.repository.CouponRepository;
import org.project.pack.repository.OneDayClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/view")
public class ReservationAppController {

	@Autowired
	OneDayClassRepository odcRep;
	
	@Autowired
	CouponRepository cpRep;
	
	public static boolean startsWithNumber(String str) {
        return str != null && str.matches("^[0-9].*");
    }
	
	@GetMapping("/{cId}")
	public String showClass(Model model, @PathVariable Long cId ,@AuthenticationPrincipal @Nullable UD ud, HttpSession session) {
		OneDayClass odc = odcRep.findBycId(cId);
		
		if (ud != null) {
	        session.setAttribute("userId", ud.getUser().getUId());
	    } else {
	        session.removeAttribute("userId");
	    }
		
		
		String[] address = odc.getCAddr().split(" ");
	      String fulladd = "";
	      for(String add : address) {
	         if((!add.equals("대한민국") && fulladd == "") || startsWithNumber(add)) {
	            if(add.equals("서울특별시")) add = "서울";
	            fulladd += add;
	         }else if(!add.equals("대한민국") && fulladd.length() > 0) {
	            fulladd += " · " + add;
	         }
	    }
	    String imagestr = odc.getCImagesKeys();
        imagestr = imagestr.replace("host", "");

        String[] parts = imagestr.split(odc.getImageKey());

        List<String> imageList = new ArrayList<>();
        imageList.add(null);

        for (String part : parts) {
            if (part.startsWith("main")) {
            	imageList.set(0, part);
            } else if (part.startsWith("sub")) {
            	imageList.add(part);
            }
        }
        
		model.addAttribute("uId",ud!=null ? ud.getUser().getUId() : null);
		model.addAttribute("cId",odc.getCId());
		model.addAttribute("title",odc.getTitle());
		model.addAttribute("description",odc.getDescription());
		model.addAttribute("cAddr",odc.getCAddr());
		model.addAttribute("cAddrDetail",odc.getCAddrDetail());
		model.addAttribute("regDate",odc.getRegDate());
		model.addAttribute("price",odc.getPrice().toString());
		model.addAttribute("avgRating",Methods.cutBelow(odc.getAvgRating()));
		model.addAttribute("difficulty",Methods.sortDifficulty(odc.getDifficulty()));
		model.addAttribute("imageAddr",odc.getImageAddr());
		model.addAttribute("imageKey",odc.getImageKey());
		model.addAttribute("cImagesKeys",imageList); // [0] = main [1] = sub1 [2] = sub2
		model.addAttribute("hostname",odc.getHNick());
		model.addAttribute("mainCategory",odc.getMaincategory().getName());
		model.addAttribute("subCategory",odc.getSubcategory().getName());
		model.addAttribute("curriculum",odc.getCurriculum().split("pp"));
		model.addAttribute("duration",Methods.sortDuration(odc.getDuration()));
		model.addAttribute("fulladd",fulladd);
		
		return "reservation";
	}
	
	@PostMapping("/{cId}/pay")
	public String paymentPage(Model model,@RequestParam Integer participants, 
            @RequestParam Integer totalPrice, @PathVariable Long cId,@AuthenticationPrincipal UD ud) {
		OneDayClass odc = odcRep.findBycId(cId);
		
		model.addAttribute("cId",odc.getCId());
		model.addAttribute("participants",participants);
		model.addAttribute("totalPrice",totalPrice.toString());
		model.addAttribute("title",odc.getTitle());
		model.addAttribute("image","/"+odc.getImageAddr()+"/main.jpg");
		model.addAttribute("cAddrDetail",odc.getCAddrDetail());
		model.addAttribute("price",odc.getPrice().toString());
		model.addAttribute("username",ud.getName());
		model.addAttribute("useremail",ud.getUser().getEmail());
		model.addAttribute("uId",ud.getUser().getUId());
		model.addAttribute("credit",ud.getUser().getCredit());
		model.addAttribute("coupon",cpRep.findAllByStatusAndUser_uId(0,ud.getUser().getUId()));
		return "pay";
	}
}
