package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {
	
	@Query("SELECT c FROM Credit c "
			+ "JOIN FETCH c.user u "
			+ "WHERE u.uId = :uId "
		    + "ORDER BY c.crdId DESC")
	public List<Credit> findAllByUser_uId(Long uId);
}
