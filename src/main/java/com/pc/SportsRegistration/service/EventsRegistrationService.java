package com.pc.SportsRegistration.service;

import com.pc.SportsRegistration.dao.SportEventsRepo;
import com.pc.SportsRegistration.model.SportEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class EventsRegistrationService {
    @Autowired
    SportEventsRepo repo;

    public List<SportEvent> getAllEvents(){
        return repo.findAll();
    }

    public List<Integer> getUserSubscribedEvents(long userId){
        return repo.findUserSubscripedEvents(userId);
    }

    @Transactional
    public boolean registerUserForEvent(long userId, long eventId, String action) {
        int result;
        if(action.equalsIgnoreCase("register")){
            result = repo.registerUserForEvent(userId, eventId);
        }else{
            result = repo.unregisterUserForEvent(userId, eventId);
        }
        return (result > 0);
    }
}
