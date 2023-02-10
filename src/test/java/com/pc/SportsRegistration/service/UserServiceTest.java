package com.pc.SportsRegistration.service;

import com.pc.SportsRegistration.dao.UserRepo;
import com.pc.SportsRegistration.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    UserService service;

    @Mock
    UserRepo repo;

    User getUser(){
        return new User(1,"Priyanka","Chaudhery","pc@gmail.com");
    }

    @Test
    public void createUser_basic(){
        User user = getUser();
        List<User> users = new ArrayList<>();
        users.add(user);
        when(repo.saveAndFlush(user)).thenReturn(user);
        when(service.getUser(anyString())).thenReturn(users);
        try {
            assertEquals(user, service.createUser(user));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void getUser_basic(){
        User user = getUser();
        List<User> users = new ArrayList<>();
        users.add(user);
        String emailId = "pc@gmail.com";
        when(repo.findByEmailId(emailId)).thenReturn(users);
        assertEquals(users, service.getUser(emailId));
    }

}
