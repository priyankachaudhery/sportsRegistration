package com.pc.SportsRegistration.service;

import com.pc.SportsRegistration.dao.UserRepo;
import com.pc.SportsRegistration.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepo repo;

    public User createUser(User user) throws SQLException {
        repo.saveAndFlush(user);
        return getUser(user.getEmailId()).get(0);
    }


    public List<User> getUser(String emailId) {
        return repo.findByEmailId(emailId);
    }
}
