package org.project.pack.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SubCategory")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategory {
	@Id
	Long subCategoryId;
	String name;
	
	@ManyToOne
	@JoinColumn(name = "mainCategoryId")
	MainCategory maincategory;
	
	
	
}