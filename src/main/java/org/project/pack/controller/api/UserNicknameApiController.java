package org.project.pack.controller.api;

import org.project.pack.classes.UD;
import org.project.pack.entity.User;
import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserNicknameApiController {
	
	@Autowired
	UserRepository userRep;
	
	
	@PostMapping("/cnick/{encodedUserNick}")
	public void changeUserNick(@AuthenticationPrincipal @Nullable UD ud, @PathVariable String encodedUserNick) {
		User user = ud.getUser();
		user.setName(encodedUserNick);
		userRep.save(user);
	}
}
