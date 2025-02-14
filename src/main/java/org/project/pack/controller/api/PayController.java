package org.project.pack.controller.api;

import org.project.pack.classes.UD;
import org.project.pack.entity.User;
import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PayController {
	
	@Autowired
	UserRepository userRep;
	
	@PostMapping("/useCredit")
	public void useCredit(@RequestParam Integer credit,@AuthenticationPrincipal UD ud) {
		User user = ud.getUser();
		user.setCredit(user.getCredit()-credit);
		userRep.save(user);
	}
	
	@PostMapping("/giveCredit")
	public void giveCredit(@RequestParam Integer finalPay,@AuthenticationPrincipal UD ud) {
		User user = ud.getUser();
		user.setCredit(user.getCredit()+finalPay/100);
		userRep.save(user);
	}
	
}
