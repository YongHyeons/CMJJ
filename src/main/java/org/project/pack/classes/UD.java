package org.project.pack.classes;

import java.util.Collection;
import java.util.Map;

import org.project.pack.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UD implements UserDetails, OAuth2User {
	
	@Autowired
	User user;
	
	
	@Override
	public String getPassword() {
		return null;
	}
	@Override
	public String getUsername() {
		return user.getName();
	}
	
	
	
	@Override
	public Map<String, Object> getAttributes() {
		return user.getAttributes();
	}
	@Override
	public String getName() {
		return user.getName();
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

}












