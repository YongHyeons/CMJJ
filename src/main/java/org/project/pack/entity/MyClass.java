package org.project.pack.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "MyClass")
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(
	name = "MyClassSeq",
	initialValue = 0,
	allocationSize = 1,
	sequenceName = "MyClassSeq"
)
public class MyClass {
	@Id
	@GeneratedValue(
		generator = "MyClassSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long resCId;
	Integer status;
	Integer participants;
	Integer totalPrice;
	LocalDate signDate;
	
	@ManyToOne
	@JoinColumn(name = "uId")
	User user;
	
	@ManyToOne
	@JoinColumn(name = "cId")
	OneDayClass onedayclass;
}
