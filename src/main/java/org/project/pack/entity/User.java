package org.project.pack.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "UserTable")
@SequenceGenerator(
	allocationSize = 1,
	initialValue = 0,
	name = "UserSeq",
	sequenceName = "UserSeq"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue(
		generator = "UserSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long uId;
	String providerId;
	String name; // required
	String provider;
	String email;
	String phnum;
	Integer credit;
	String inviteCode;
	
	@OneToMany(mappedBy="user")
	List<WishList> wlList;
	
	/*
	 * @ElementCollection(fetch = FetchType.EAGER) List<String> auths = new
	 * ArrayList<String>(); // 권한
	 */	
	@Transient
	Map<String, Object> attributes = new HashMap<String, Object>();	
}










