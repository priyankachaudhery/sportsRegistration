package com.pc.SportsRegistration.service;

import com.pc.SportsRegistration.dao.SportEventsRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import  static  org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class EventRegistrationServiceTest {

    @InjectMocks
    EventsRegistrationService service;
    @Mock
    SportEventsRepo repo;
    long userId = 1;
    long eventId = 1;

    @Test
    public void getUserSubscribedEvents_basic(){
        when(repo.findUserSubscripedEvents(userId)).thenReturn(Arrays.asList(1,2,3));
        List<Integer> result = service.getUserSubscribedEvents(userId);

        assertEquals(2,result.get(1));
    }

    @Test
    public void registerUserForEvent_register(){
        String action = "register";
        when(repo.registerUserForEvent(userId,eventId)).thenReturn(1);
        boolean result = service.registerUserForEvent(userId,eventId,action);

        assertEquals(true, result);
    }

    @Test
    public void registerUserForEvent_unregister(){
        String action = "unregister";
        when(repo.unregisterUserForEvent(userId,eventId)).thenReturn(1);
        boolean result = service.registerUserForEvent(userId,eventId,action);

        assertEquals(true, result);
    }

}
