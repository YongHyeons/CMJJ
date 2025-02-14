package org.project.pack.controller.api;

import org.project.pack.classes.UD;
import org.project.pack.entity.User;
import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PhnumApiController {
	
	@Autowired
	UserRepository userRep;
	
	@PostMapping("/phnum/{phnum}")
    public void phnum(@PathVariable String phnum, @AuthenticationPrincipal UD ud) {

        String result = phnum.replace("-", "");
        
        User user = ud.getUser();
        user.setPhnum(result);
        
        userRep.save(user);
    }
}
