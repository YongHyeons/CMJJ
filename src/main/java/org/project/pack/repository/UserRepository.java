package org.project.pack.repository;

import org.project.pack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public User findByuId(Long uId);
	public User findByName(String name);
	public User findByWlList_wLId(Long wLId);
	public User findByproviderId(String providerId);
	public void deleteByuId(Long uId);
}
