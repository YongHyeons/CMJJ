package org.project.pack.controller.app;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.project.pack.classes.UD;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegistrationAppController {
	
	@GetMapping("/reg")
	public String ma(@AuthenticationPrincipal UD ud) {
		if(ud==null){return "redirect:/login";}
		return "registration";
	}
}