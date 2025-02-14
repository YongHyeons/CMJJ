package org.project.pack.controller.api;

import java.time.LocalDate;
import java.util.Map;

import org.project.pack.classes.UD;
import org.project.pack.entity.Coupon;
import org.project.pack.entity.Credit;
import org.project.pack.entity.MyClass;
import org.project.pack.entity.OneDayClass;
import org.project.pack.entity.User;
import org.project.pack.repository.CouponRepository;
import org.project.pack.repository.CreditRepository;
import org.project.pack.repository.MyClassRepository;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class MyClassApiController {
	
	@Autowired
	MyClassRepository mcRep;
	
	@Autowired
	UserRepository userRep;
	
	@Autowired
	OneDayClassRepository odcRep;
	
	@Autowired
	CreditRepository crdRep;
	
	@Autowired
	CouponRepository cpRep;
	
	@PostMapping("/process")
	public void pP(
	    @RequestBody Map<String, String> requestData, 
	    @AuthenticationPrincipal UD ud
	) {
	    Long uId = Long.parseLong(requestData.get("uId"));
	    Long cId = Long.parseLong(requestData.get("cId"));
	    Integer participants = Integer.parseInt(requestData.get("participants"));
	    Integer totalPrice = Integer.parseInt(requestData.get("totalPrice"));
	    Integer usedCredit = Integer.parseInt(requestData.get("usedCredit"));
	    Integer givenCredit = Integer.parseInt(requestData.get("givenCredit"));
	    String cpCode = requestData.get("cpCode");

	    LocalDate today = LocalDate.now();
	    User user = ud.getUser();
	    OneDayClass odc = odcRep.findBycId(cId);
	    mcRep.save(new MyClass(null, 0, participants, totalPrice, today, user, odc));

	    if (usedCredit != 0) {
	        Integer inputCredit = -usedCredit;
	        crdRep.save(new Credit(null, inputCredit, odc.getTitle() + " 클래스 신청", today, user));
	    }
	    if (givenCredit != 0) {
	        crdRep.save(new Credit(null, givenCredit, odc.getTitle() + " 클래스 신청", today, user));
	    }

	    if (cpCode != null && !cpCode.equals("none")) {
	        Coupon cp = cpRep.findByCodeAndUser_uId(cpCode, uId);
	        cp.setStatus(1);
	        cpRep.save(cp);
	    }
	}

}
