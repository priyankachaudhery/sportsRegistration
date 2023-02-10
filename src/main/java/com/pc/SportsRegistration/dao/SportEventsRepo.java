package com.pc.SportsRegistration.dao;

import com.pc.SportsRegistration.model.SportEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SportEventsRepo extends JpaRepository<SportEvent, Long> {

    @Query(value = "select event_id from user_event_map where user_id = ?1" , nativeQuery = true)
    List<Integer> findUserSubscripedEvents(Long userId);

    @Modifying
    @Query(value = "INSERT INTO user_event_map(`user_id`,`event_id`) VALUES (?1,?2)" , nativeQuery = true)
    int registerUserForEvent(Long userId, Long eventId);

    @Modifying
    @Query(value = "Delete from user_event_map where user_id = ?1 and event_id = ?2" , nativeQuery = true)
    int unregisterUserForEvent(Long userId, Long eventId);

}
