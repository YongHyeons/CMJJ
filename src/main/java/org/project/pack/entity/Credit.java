package org.project.pack.entity;

import java.time.LocalDate;

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
@Table(name = "Credit")
@SequenceGenerator(
	name = "CreditSeq",
	allocationSize = 1,
	initialValue = 0,
	sequenceName = "CreditSeq"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Credit {
	@Id
	@GeneratedValue(
		generator = "CreditSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long crdId;
	Integer amount;
	String route;
	LocalDate cDate;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "uId")
	User user;
}





















