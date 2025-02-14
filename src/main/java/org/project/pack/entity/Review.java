package org.project.pack.entity;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Review")
@SequenceGenerator(
	name = "ReviewSeq",
	allocationSize = 1,
	initialValue = 0,
	sequenceName = "ReviewSeq"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
	@Id
	@GeneratedValue(
		generator = "ReviewSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long reviewId;
	String content;
	LocalDate reviewDate;
	Double reviewRating;
	
	@ManyToOne
	@JoinColumn(name = "uId")
	User user;
	
	@ManyToOne
	@JoinColumn(name = "cId")
	OneDayClass onedayclass;
	
	
	
	
	
}
