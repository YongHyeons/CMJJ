package org.project.pack.entity;




import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "OneDayClass")
@SequenceGenerator(
	name = "ClassSeq",
	allocationSize = 1,
	initialValue = 0,
	sequenceName = "ClassSeq"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OneDayClass {
	@Id
	@GeneratedValue(
		generator = "ClassSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long cId;
	@Column(length = 60)
	String title;
	@Column(length = 4000)
	String description;
	@Column(length = 100)
	String cAddr;
	@Column(length = 100)
	String cAddrDetail;
	LocalDate regDate;			
	Integer price;
	Double avgRating;
	Boolean isClosed;
	Integer difficulty;
	String imageAddr;
	String imageKey;
	String cImagesKeys;
	@Column(length = 2000)
	String curriculum;
	Integer duration;
	String phnum;
	@Column(length = 3000)
	String hIntro;
	String hNick;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "uId")
	User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "mainCategoryId", referencedColumnName = "mainCategoryId")
	MainCategory maincategory;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "subCategoryId", referencedColumnName = "subCategoryId")
	SubCategory subcategory;
	
	
	

	
	
}

