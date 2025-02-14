package org.project.pack.controller.api;

import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WithdrawApiController {
	
	@Autowired
	UserRepository userRep;
	
	@PostMapping("/process/withdraw/{uId}")
	public String withdraw(@PathVariable Long uId) {
		userRep.deleteByuId(uId);	
		return "redirect:/main";
	}
}
