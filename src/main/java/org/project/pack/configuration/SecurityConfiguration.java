package org.project.pack.configuration;

import org.project.pack.services.UDS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	
	@Value("${csrf.ignore.path}")
    String csrfIgnorePath;
    @Value("${login.page.path}")
    String loginPage;
    @Value("${login.process.path}")
    String loginProcess;
    @Value("${login.username}")
    String username;
    @Value("${login.password}")
    String password;
    @Value("${login.success.path}")
    String loginSuccess;
    @Value("${login.failure.path}")
    String loginFailure;
    @Value("${login.logout.path}")
    String loginLogout;
    @Value("${login.logout.redirect.path}")
    String loginLogoutRedirect;
	
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    
	@Autowired
	UDS userdetailsservice;
	
	@Bean
	public SecurityFilterChain register(HttpSecurity http) throws Exception {
		http
			.csrf(target->
				target
					.ignoringRequestMatchers(csrfIgnorePath)
					.ignoringRequestMatchers("/api/testupload")
	                .ignoringRequestMatchers("/api/delete/**")
	                .ignoringRequestMatchers("/api/uploadImage")
	                .ignoringRequestMatchers("/api/saveContent")
	                .ignoringRequestMatchers("/api/clearFolder")
	                .ignoringRequestMatchers("/api/mainImageUpload")
	                .ignoringRequestMatchers("/api/hostImageUpload")
	                .ignoringRequestMatchers("/generate-key")
	                .ignoringRequestMatchers("/api/useKey")
	                .ignoringRequestMatchers("/payment/process")
	                .ignoringRequestMatchers("/payment/**")
	                .ignoringRequestMatchers("/uploadprofile")
	                .ignoringRequestMatchers("/phnum/**")
	                .ignoringRequestMatchers("/api/wishlist/**")
	                .ignoringRequestMatchers("/reg")
	                .ignoringRequestMatchers("/cnick/**")
	                .ignoringRequestMatchers("/send-email")
	                .ignoringRequestMatchers("/useCredit")
	                .ignoringRequestMatchers("/giveCredit")
	                .ignoringRequestMatchers("/cpreg")
	                .ignoringRequestMatchers("/view/**")
	                .ignoringRequestMatchers("/api/modzoneupload")
	                .ignoringRequestMatchers("/api/modfiles/**")
	                .ignoringRequestMatchers("/api/modfiles")
	                .ignoringRequestMatchers("/api/moddeleteFiles")
	                .ignoringRequestMatchers("/api/moddelete")
	                .ignoringRequestMatchers("/api/moddeleteMainFiles")
	                .ignoringRequestMatchers("/api/moduploadImage")
	                .ignoringRequestMatchers("/api/modmainImage")
	                .ignoringRequestMatchers("/api/modsaveContent")
	                .ignoringRequestMatchers("/api/modmainImageUpload")
	                .ignoringRequestMatchers("/api/modhostImageUpload")
	                .ignoringRequestMatchers("/api/deleteOldImages")
	                .ignoringRequestMatchers("/api/getInitialContent")
	                .ignoringRequestMatchers("/api/modimages")
	                .ignoringRequestMatchers("/perform/logout")
	                .ignoringRequestMatchers("/view/{cId}/pay")
	                .ignoringRequestMatchers("/", "/home", "/login", "/css/**", "/js/**", "/images/**")
			)
			.authorizeHttpRequests(target->
				target
					.dispatcherTypeMatchers(DispatcherType.FORWARD)
					.permitAll()
					.requestMatchers("/css/**", "/js/**", "/images/**", "/uploads/**").permitAll() 
					.requestMatchers("/perform/logout").permitAll() 
					.requestMatchers("/api/wishlist/add","/api/wishlist/remove","/api/wishlist/check","/api/wishlist","/api/wishlist/countWishes")
					.permitAll()
					.requestMatchers("/","/js/**","/css/**","/login","/app/main","/login/**","login/page")
					.permitAll()
					.requestMatchers("/mypage","/view/**","/phnum/**","/phnum","/phnum/*")
					.permitAll()
					.requestMatchers("/api/wishlist/add","/api/wishlist/remove","/api/wishlist/check","/api/wishlist")
					.permitAll()
					.requestMatchers("/payment/process","/payment/process/**","/payment/**")
					.permitAll()
					.requestMatchers("/api/testupload").permitAll()
	                .requestMatchers("/api/delete/**").permitAll()
	                .requestMatchers("/api/uploadImage").permitAll() 
	                .requestMatchers("/api/saveContent").permitAll()
	                .requestMatchers("/api/clearFolder").permitAll()
	                .requestMatchers("/api/mainImageUpload").permitAll()
	                .requestMatchers("/api/hostImageUpload").permitAll()
	                .requestMatchers("/generate-key").permitAll()
	                .requestMatchers("/up","/up/*","/up/**").permitAll()
	                .requestMatchers("/uploadprofile","/uploadprofile/**","/uploadprofile/*").permitAll()
	                .requestMatchers("/api/useKey").permitAll()
	                .requestMatchers("/api/modzoneupload").permitAll()
	                .requestMatchers("/api/modfiles/**").permitAll()
	                .requestMatchers("/api/modfiles").permitAll()
	                .requestMatchers("/api/moddeleteFiles").permitAll()
	                .requestMatchers("/api/moddelete").permitAll()
	                .requestMatchers("/api/moddeleteMainFiles").permitAll()
	                .requestMatchers("/api/moduploadImage").permitAll()
	                .requestMatchers("/api/modmainImage").permitAll()
	                .requestMatchers("/api/modsaveContent").permitAll()
	                .requestMatchers("/api/modmainImageUpload").permitAll()
	                .requestMatchers("/api/modhostImageUpload").permitAll()
	                .requestMatchers("/api/deleteOldImages").permitAll()
	                .requestMatchers("/api/getInitialContent").permitAll()
	                .requestMatchers("/api/modimages").permitAll()
	                .requestMatchers("/view/{cId}/pay").permitAll()
					.requestMatchers("/mypage")
					.permitAll()
					.anyRequest()
					.permitAll()
			)
			.formLogin(form -> form
	                .loginPage(loginPage)
	                .loginProcessingUrl(loginProcess)
	                .usernameParameter(username)
	                .passwordParameter(password)
	                .defaultSuccessUrl(loginSuccess)
	                .failureUrl(loginFailure)
	                .permitAll()
			)
			.logout(logout -> logout
				    .clearAuthentication(true)
				    .invalidateHttpSession(true)
				    .deleteCookies("JSESSIONID")
				    .logoutUrl("/perform/logout")
				    .logoutSuccessHandler((request, response, authentication) -> {
				        response.sendRedirect("/main");
				    })
				)
			.oauth2Login(oauth2 -> oauth2
	                .userInfoEndpoint(userInfo -> userInfo
	                .userService(userdetailsservice)
	                    )
	                .defaultSuccessUrl(loginSuccess)
                    .loginPage(loginPage)
                    .failureUrl(loginFailure)
                    .permitAll()
			);
		
		return http.getOrBuild();
	}
	
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	private String determineLogoutRedirectUrl(Authentication authentication) {
	    if (authentication == null) {
	        return loginLogoutRedirect;
	    }

	    String provider = authentication.getAuthorities().stream()
	        .map(grantedAuthority -> grantedAuthority.getAuthority())
	        .filter(role -> role.startsWith("ROLE_"))
	        .findFirst()
	        .map(role -> role.replace("ROLE_", ""))
	        .orElse("DEFAULT");

	    switch (provider) {
	        case "KAKAO":
	            return "https://kauth.kakao.com/oauth/logout?client_id=" + kakaoClientId + "&logout_redirect_uri=" + loginLogoutRedirect;
	        case "GOOGLE":
	        	return "/perform/google-logout";
	        case "NAVER":
	            return "https://nid.naver.com/nidlogin.logout?returl=" + loginLogoutRedirect;
	        default:
	            return loginLogoutRedirect;
	    }
	}
}
























