package org.project.pack.controller.api;

import org.project.pack.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/wishlist")
public class WishListApiController {
	
	@Autowired
	private WishlistService wishlistService;

	@Transactional
	@PostMapping("/add")
	public ResponseEntity<String> addToWishlist(@RequestParam Long uId, @RequestParam Long cId) {
	    wishlistService.addWishlistItem(uId, cId);
	    return ResponseEntity.ok("success");
	}
	@Transactional
	@PostMapping("/remove")
	public ResponseEntity<String> removeFromWishlist(@RequestParam Long uId, @RequestParam Long cId) {
	    wishlistService.removeWishlistItem(uId, cId);
	    return ResponseEntity.ok("success");
	}
	@Transactional
	@GetMapping("/check")
	public ResponseEntity<String> checkWishlist(@RequestParam Long uId, @RequestParam Long cId) {
	    boolean exists = wishlistService.checkWishlist(uId, cId);
	    return ResponseEntity.ok(String.valueOf(exists));
	}
	
	@Transactional
	@PostMapping("/countWishes")
	public ResponseEntity<String> countWishlist(@RequestParam Long cId){
		Integer count = wishlistService.countWishes(cId);
		return ResponseEntity.ok(String.valueOf(count));
	}
	
}
