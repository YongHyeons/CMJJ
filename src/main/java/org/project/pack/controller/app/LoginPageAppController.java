package org.project.pack.controller.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginPageAppController {

	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}

}
