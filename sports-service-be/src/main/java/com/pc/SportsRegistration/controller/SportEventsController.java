package com.pc.SportsRegistration.controller;

import com.pc.SportsRegistration.model.SportEvent;
import com.pc.SportsRegistration.service.EventsRegistrationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class SportEventsController {

    private static final Logger logger = LoggerFactory.getLogger(SportEventsController.class);

    @Autowired
    EventsRegistrationService service;

    @CrossOrigin("*")
    @GetMapping("/events")
    public ResponseEntity getAllEvents() {
        ResponseEntity response = null;
        try {
            List<SportEvent> events = service.getAllEvents();
            response = new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Exception in gettingEvents ", e.getCause());
            response = new ResponseEntity<>("Failed to get Events", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @CrossOrigin("*")
    @GetMapping("/events/{userId}")
    public ResponseEntity getUserEvents(@PathVariable long userId) {
        ResponseEntity response = null;
        try {
            List<Integer> eventIds = service.getUserSubscribedEvents(userId);
            response = new ResponseEntity<>(eventIds, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Exception in getUserEvents ", e.getCause());
            response = new ResponseEntity<>("Failed to get user Events", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @CrossOrigin("*")
    @PostMapping("/events/{action}/{userId}/{eventId}")
    public ResponseEntity registerUserForEvents(@PathVariable("action") String action,@PathVariable("userId") Long userId, @PathVariable("eventId") Long eventId) {
        ResponseEntity response = null;
        try {
            if (service.registerUserForEvent(userId, eventId, action))
                response = new ResponseEntity<>("Success",HttpStatus.OK);
            else
                response = new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        } catch (Exception e) {
            logger.error("Exception in registerUserForEvents ", e.getCause());
            response = new ResponseEntity<>("Failed to register user Events", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

}
