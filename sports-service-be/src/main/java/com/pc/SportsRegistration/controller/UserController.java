package com.pc.SportsRegistration.controller;

import com.pc.SportsRegistration.model.SportEvent;
import com.pc.SportsRegistration.model.User;
import com.pc.SportsRegistration.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService service;

    @CrossOrigin("*")
    @PostMapping("/user")
    public ResponseEntity createUser(@RequestBody User user){
        ResponseEntity response = null;
        try{
            User savedUser = service.createUser(user);
            response = new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        }catch (Exception e){
            logger.error("Exception in creating User ", e.getCause());
            response = new ResponseEntity<>("Failed to create User", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @CrossOrigin("*")
    @PostMapping("/user/me")
    public ResponseEntity getUser(@RequestBody Map<String,String> inputMap){
        ResponseEntity response = null;
        try{
            List<User> user = service.getUser(inputMap.get("emailId"));
            if(user.size() > 0){
                response = new ResponseEntity<>(user.get(0), HttpStatus.OK);
            }else {
                response = new ResponseEntity<>("User not registered", HttpStatus.NOT_FOUND);
            }

        }catch (Exception e){
            logger.error("Exception in getting User ", e.getCause());
            response = new ResponseEntity<>("Failed to create User", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }


}
