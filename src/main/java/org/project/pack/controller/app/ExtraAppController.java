package org.project.pack.controller.app;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ExtraAppController {

	@GetMapping("/terms")
	public String terms(Model model,@RequestParam Integer p) {
		model.addAttribute("page",p);
		return "bottomPage";
	}
	
	@GetMapping("/teamA")
	public String intro() {
		return "teamIntroduction";
	}
	
	@GetMapping("/guide")
	public String regGuide() {
		return "registrationGuide";
	}
}
