package org.project.pack.controller.app;

import org.project.pack.classes.UD;
import org.project.pack.entity.MainCategory;
import org.project.pack.entity.OneDayClass;
import org.project.pack.entity.SubCategory;
import org.project.pack.repository.MainCategoryRepository;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ModificationAppController {
	
	@Autowired
	OneDayClassRepository odcRep;
	
	@Autowired
	MainCategoryRepository mcRep;
	
	@Autowired
	SubCategoryRepository scRep;
	
	
	@GetMapping("/mod")
	public String ma(Model model, @RequestParam Long cId, @AuthenticationPrincipal UD ud) {
		OneDayClass odc = odcRep.findBycId(cId);

		
		if(odc.getUser().getUId() != ud.getUser().getUId()) {
			return "redirect:/mypage/home";
		}
		
		MainCategory mc = odc.getMaincategory();
		String mName = mc.getName();
		
		SubCategory sc = odc.getSubcategory();
		String sName = sc.getName();
		
		model.addAttribute("phonenumber",odc.getPhnum());
		model.addAttribute("title",odc.getTitle());
		model.addAttribute("hostname",odc.getHNick());
		model.addAttribute("hostintro",odc.getHIntro());
		model.addAttribute("cAddr",odc.getCAddr());
		model.addAttribute("cAddrDetail", odc.getCAddrDetail());
		model.addAttribute("price",odc.getPrice().toString());
		model.addAttribute("curriculum",odc.getCurriculum());
		model.addAttribute("categorymain",mName);
		model.addAttribute("categorysub",sName);
		model.addAttribute("difficulty",odc.getDifficulty().toString());
		model.addAttribute("hour",odc.getDuration().toString());
		model.addAttribute("imagekey",odc.getImageKey());
		model.addAttribute("regdate",odc.getRegDate());
		
		
		return "modification";
	}
	
}
