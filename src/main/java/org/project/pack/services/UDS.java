package org.project.pack.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.project.pack.classes.UD;
import org.project.pack.entity.User;
import org.project.pack.entity.WishList;
import org.project.pack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class UDS extends DefaultOAuth2UserService implements UserDetailsService {
	
	@Autowired
	UserRepository userRep;
	
	@Value("${auth.user}")
	String userAuth;
	
	@Value("${login.process.path}")
	String aa;
	
	@Override
	@PostMapping("${aa}")
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(userRequest);
		String provider = userRequest.getClientRegistration().getRegistrationId();
		String name = ""; // required
		String providerId = "";
		String email="";
		Map<String,Object> attributes = user.getAttributes();
		Map<String, Object> response = null;
		if(provider.equals("google") || provider.equals("facebook")) {
            name = (attributes.get("name") != null ? attributes.get("name").toString() : "unknown");
            providerId = (attributes.get("sub") != null ? attributes.get("sub").toString() : "unknown");
            email=(attributes.get("email") !=null ? attributes.get("email").toString() : "unknown");
		} else if (provider.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
            name = (kakaoProfile.get("nickname") != null ? kakaoProfile.get("nickname").toString() : "unknown");
            providerId = attributes.get("id").toString();
            email = (kakaoAccount.get("email") != null? kakaoAccount.get("email").toString() : "unknown");
        } else if(provider.equals("naver")) {
            response = (Map<String, Object>) attributes.get("response");
            name = (response.get("name") != null ? response.get("name").toString() : "unknown");
            providerId = response.get("id").toString();
            email = (response.get("email")!=null ? response.get("email").toString() : "unknown");
        }
		User userByName = userRep.findByproviderId(providerId);
		if(userByName == null) {
            userByName = new User(null, providerId ,name, provider, email, null, 0, null, new ArrayList<WishList>(),attributes);
            userRep.save(userByName);
        } else {
            
        }
		System.out.println(attributes);
		return new UD(userByName);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
		User user = userRep.findByName(username);
		if(user == null) throw new UsernameNotFoundException(username);
		return new UD(user);
	}
}





















