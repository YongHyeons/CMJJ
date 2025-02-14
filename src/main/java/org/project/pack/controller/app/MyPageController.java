package org.project.pack.controller.app;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.project.pack.classes.Randomizer;
import org.project.pack.classes.UD;
import org.project.pack.controller.api.WishListApiController;
import org.project.pack.entity.Coupon;
import org.project.pack.entity.Credit;
import org.project.pack.entity.MyClass;
import org.project.pack.entity.OneDayClass;
import org.project.pack.entity.User;
import org.project.pack.entity.WishList;
import org.project.pack.repository.CouponRepository;
import org.project.pack.repository.CreditRepository;
import org.project.pack.repository.MyClassRepository;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.repository.UserRepository;
import org.project.pack.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	@Autowired
	WishListApiController wlApi;
	
	@Autowired 
	UserRepository userRep;
	
	@Autowired
	OneDayClassRepository odcRep;
	
	@Autowired
	WishListRepository wlRep;
	
	@Autowired
	MyClassRepository mcRep;
	
	@Autowired
	CouponRepository cpRep;
	
	@Autowired
	CreditRepository crdRep;
	
	private static final String BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	private static final Random RANDOM = new Random();

    public static String encodeBase62(Long number, int length) {
        if (number == null) {
            throw new IllegalArgumentException("Number cannot be null");
        }

        StringBuilder result = new StringBuilder();
        int base = BASE62.length();

        // 숫자를 Base62로 변환
        while (number > 0) {
            int remainder = (int) (number % base);
            result.insert(0, BASE62.charAt(remainder));
            number /= base;
        }

        // Base62로 변환된 결과가 지정된 길이보다 짧을 경우
        while (result.length() < length) {
            // 무작위 알파벳 및 숫자를 추가하여 길이를 맞춤
            result.insert(0, BASE62.charAt(RANDOM.nextInt(base)));
        }

        // 결과 문자열의 길이가 지정된 길이보다 길 경우, 앞에서부터 잘라냄
        if (result.length() > length) {
            return result.substring(result.length() - length);
        }

        return result.toString();
    }
	
	@GetMapping("/home")
	public String myPageHome(@AuthenticationPrincipal UD ud,Model model) {
		if(ud == null){
			return "redirect:/login";
		}

		List<OneDayClass> hostingClassesList = odcRep.findAllByUser_uId(ud.getUser().getUId());
		List<WishList> wl = wlRep.findAllByUser_uId(ud.getUser().getUId());
		List<Coupon> cpList = cpRep.findAllByStatusAndUser_uId(0,ud.getUser().getUId());
		Integer wlSize = wl.size();
		
		model.addAttribute("uId",ud.getUser().getUId());
		model.addAttribute("uphnum",ud.getUser().getPhnum());
		model.addAttribute("username",ud.getUser().getName());
		model.addAttribute("useremail",ud.getUser().getEmail());
		model.addAttribute("provider",ud.getUser().getProvider());
		model.addAttribute("providerId",ud.getUser().getProviderId());
		model.addAttribute("hostingClassesList",hostingClassesList);
		model.addAttribute("wlSize",wlSize);
		model.addAttribute("credit",ud.getUser().getCredit());
		model.addAttribute("coupon",cpList);
		model.addAttribute("profile", ud.getUser().getUId().toString());
		return "myPage";
	}
	
	@GetMapping("/wishlist")
	public String wishList(
		Model model
		,@AuthenticationPrincipal UD ud
	) {
		Long uId = ud.getUser().getUId();
		List<WishList> wlList = wlRep.findAllByUser_uId(uId);
		List<Long> cIds = new ArrayList<Long>();
		for(WishList wl : wlList) {
			cIds.add(wl.getOnedayclass().getCId());
		}
		List<OneDayClass> odcList = odcRep.findAllBycIds(cIds);
		model.addAttribute("classList",odcList);
		model.addAttribute("uId",ud.getUser().getUId());
		
		return "wishlist";
	}
	@GetMapping("/myclass")
	public String myclass(Model model
						,@AuthenticationPrincipal UD ud)
	{ 
		if(ud == null){
			return "redirect:/login";
		}
		Long uId = ud.getUser().getUId();
		
		List<MyClass> signUps = new ArrayList<MyClass>(); 
		List<MyClass> accepted = new ArrayList<MyClass>();
		List<MyClass> rejected = new ArrayList<MyClass>();
		List<MyClass> finished = new ArrayList<MyClass>();
		
		List<MyClass> allMyClasses = new ArrayList<MyClass>();
		allMyClasses = mcRep.findAllByUser_uId(uId);
		
		allMyClasses.forEach(c->{
			if(c.getStatus() == 0) {
				signUps.add(c);
			}
			else if(c.getStatus() == 1) {
				accepted.add(c);
			}
			else if(c.getStatus() == 2) {
				rejected.add(c);
			}
			else if(c.getStatus() == 3) {
				finished.add(c);
			}
		});
		
		List<MyClass> allMyClass = new ArrayList<MyClass>();
		
		allMyClass.addAll(signUps);
		allMyClass.addAll(accepted);
		allMyClass.addAll(rejected);
		allMyClass.addAll(finished);
		
		List<MyClass> reservedClass = new ArrayList<MyClass>();
		reservedClass.addAll(signUps);
		reservedClass.addAll(accepted);
		
		Integer countAll = allMyClass.size();
		Integer countRJ = rejected.size();
		Integer countFN = finished.size();
		Integer countRV = reservedClass.size();
		
		
		model.addAttribute("rejected",rejected);
		model.addAttribute("finished",finished);
		model.addAttribute("reserved",reservedClass);
		model.addAttribute("countAll",countAll);
		model.addAttribute("allMyClass",allMyClass);
		model.addAttribute("countRV",countRV);
		model.addAttribute("countRJ",countRJ);
		model.addAttribute("countFN",countFN);
		return "history"; 
	}
	
	@GetMapping("/coupon")
	public String coupon(Model model
			,@AuthenticationPrincipal UD ud) {
				if(ud == null){
			return "redirect:/login";
		}
		
		User user = ud.getUser();
		Long uId = user.getUId();
		
		List<Coupon> myCoupons = cpRep.findAllByUser_uId(uId);
		
		List<Coupon> unused = new ArrayList<Coupon>();
		List<Coupon> used = new ArrayList<Coupon>();
		List<Coupon> outdated = new ArrayList<Coupon>();
		
		myCoupons.forEach(c->{
			if(c.getStatus() == 0) {
				unused.add(c);
			}else if(c.getStatus() == 1) {
				used.add(c);
			}else if(c.getStatus() == 3) {
				outdated.add(c);
			}
		});
		
		model.addAttribute("unused",unused);
		model.addAttribute("used",used);
		model.addAttribute("outdated",outdated);
		
		
		return "coupon";
	}
	
	
	@GetMapping("/credit")
	public String credit(Model model
	         ,@AuthenticationPrincipal UD ud) {
				if(ud == null){
			return "redirect:/login";
		}
		LocalDate today = LocalDate.now();
		User user = ud.getUser();
		
		List<Credit> credits = crdRep.findAllByUser_uId(user.getUId());
		List<Credit> safeOnes = new ArrayList<Credit>();
		List<Credit> expiredSoon = new ArrayList<Credit>();
		List<Credit> added = new ArrayList<Credit>();
		List<Credit> used = new ArrayList<Credit>();
		
		credits.forEach(c->{
			if(c.getAmount() > 0) {
				added.add(c);
				LocalDate cDate = c.getCDate();
				long daysBtw = ChronoUnit.DAYS.between(today,cDate);
				if(daysBtw >= 150L) {
					expiredSoon.add(c);
				}
				else if(daysBtw >=180) {
					Integer newCredit = user.getCredit() - c.getAmount();
					user.setCredit(newCredit);
					userRep.save(user);
					crdRep.delete(c);
				}
				else {
					safeOnes.add(c);
				}
			}
			else {
				safeOnes.add(c);
				used.add(c);
			}
		});
	
		model.addAttribute("allCredits",credits);
		if(expiredSoon == null || expiredSoon.size() == 0) {model.addAttribute("expiredSoon",0);}
		else {model.addAttribute("expiredSoon",expiredSoon);}
		model.addAttribute("credit",user.getCredit());
		model.addAttribute("safeCredit",safeOnes);
		model.addAttribute("added",added);
		model.addAttribute("used",used);
		
		return "credit";
	}
	
	@GetMapping("/invite")
	public String invite(Model model
	         ,@AuthenticationPrincipal UD ud) {
				if(ud == null){
			return "redirect:/login";
		}
		if(ud.getUser().getInviteCode() == null || ud.getUser().getInviteCode().isEmpty()) {
			
			String invCode =  encodeBase62(ud.getUser().getUId(),24);
			User user = ud.getUser();
			user.setInviteCode(invCode);
			userRep.save(user);
			model.addAttribute("invCode",invCode);
		}else {
			String invCode = ud.getUser().getInviteCode();
			model.addAttribute("invCode",invCode);
		}
		model.addAttribute("username",ud.getUser().getName());
		
		return "invite";
	}
	
	@GetMapping("/manage")
	public String cws(Model model, @AuthenticationPrincipal UD ud) {
		
		User user = ud.getUser();
		List<OneDayClass> odclist = odcRep.findAllByUser_uId(user.getUId());
		
		
		model.addAttribute("odclist",odclist);
		return "classworkspace";
	}
	
	
	
	
}
