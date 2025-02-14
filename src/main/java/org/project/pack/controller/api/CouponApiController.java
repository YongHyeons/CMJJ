package org.project.pack.controller.api;

import org.project.pack.classes.UD;
import org.project.pack.entity.Coupon;
import org.project.pack.entity.User;
import org.project.pack.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CouponApiController {
	
	@Autowired
	CouponRepository cpRep;

	
	@PostMapping("/cpreg")
	public ResponseEntity<String> couponRegistration(@RequestBody String code ,@AuthenticationPrincipal UD ud) {
		User user = ud.getUser();
		
		code = code.replace("\"", "");
		System.out.println(code);
		Coupon cp = cpRep.findByCode(code);
		if(cp.getStatus() == 2) {
			Coupon newCp = new Coupon(null, cp.getName(), 0, cp.getCode(), cp.getType(), cp.getAmount(),cp.getEndDateString() ,cp.getEndDate(),user);
			cpRep.save(newCp);
			return ResponseEntity.ok("Coupon registered successfully");
		}else {
			return ResponseEntity.status(400).body("Coupon is not valid for registration");
		}
	}
}
