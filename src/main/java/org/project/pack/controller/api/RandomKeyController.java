package org.project.pack.controller.api;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RandomKeyController {

	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	private static final SecureRandom random = new SecureRandom();


	@PostMapping("/generate-key")
	public ResponseEntity<Map<String, String>> generateKey() {
	    String key = generateRandomKey(10);
	    return ResponseEntity.ok(Collections.singletonMap("key", key));
	}

	private String generateRandomKey(int length) {
	    StringBuilder key = new StringBuilder(length);
	    for (int i = 0; i < length; i++) {
	        key.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
	    }
	    return key.toString();
	}
}
