package org.project.pack.controller.api;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@RestController
public class AddressController {
	
	
    private final String API_KEY = "API KEY";

    @GetMapping("/autocomplete")
    public ResponseEntity<String> autocomplete(@RequestParam("input") String input) {
        String url = String.format(
            "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=%s&key=%s&language=ko", 
            input, API_KEY
        );

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        return ResponseEntity.ok(response);
    }
}




