package org.project.pack.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MainCategory")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MainCategory {
	@Id
	Long mainCategoryId;
	String name;
	
	
}
