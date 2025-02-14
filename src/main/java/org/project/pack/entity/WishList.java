package org.project.pack.entity;


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
@Table(name = "WishList")
@SequenceGenerator(
	name = "WishListSeq",
	allocationSize = 1,
	initialValue = 0,
	sequenceName = "WishListSeq"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WishList {
	@Id
	@GeneratedValue(
		generator = "WishListSeq",
		strategy = GenerationType.SEQUENCE
	)
	Long wLId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cId", referencedColumnName="cId")
	OneDayClass onedayclass;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "uId", referencedColumnName = "uId")
	User user;
	
	
}
