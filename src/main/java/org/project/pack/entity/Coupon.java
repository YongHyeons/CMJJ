package org.project.pack.entity;

import java.time.LocalDate;

import org.springframework.lang.Nullable;

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
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Coupon")
@SequenceGenerator(
	name = "CouponSeq",
	allocationSize = 1,
	initialValue = 10001,
	sequenceName = "CouponSeq"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Coupon {
	@Id
	@GeneratedValue(
		generator = "CouponSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long couponId;
	String name;
	Integer status;
	String code;
	@Column(nullable = false)
	String type;
	Integer amount;
	String endDateString;
	LocalDate endDate;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "uId")
	User user;
	
}
