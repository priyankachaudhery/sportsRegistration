package com.pc.SportsRegistration.controller;

import com.pc.SportsRegistration.model.SportEvent;
import com.pc.SportsRegistration.service.EventsRegistrationService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Timestamp;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SportEventsController.class)
public class SportsEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    EventsRegistrationService service;

    @Test
    public void getAllEvents_basic() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/events")
                .accept(MediaType.APPLICATION_JSON);

        when(service.getAllEvents()).thenReturn(Arrays.asList(new SportEvent(1,
                "Butterfly 100M",
                "Swimming",
                Timestamp.valueOf("2022-12-17 07:30:00"),
                Timestamp.valueOf("2022-12-17 08:30:00"))));

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1," +
                        "\"eventName\":\"Butterfly 100M\"," +
                        "\"eventCategory\":\"Swimming\"," +
                        "\"startTime\":\"2022-12-17T02:00:00.000+00:00\"," +
                        "\"endTime\":\"2022-12-17T03:00:00.000+00:00\"}]",true))
                .andReturn();
    }

    @Test
    public void registerUserForEvents_basic() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .post("/events/register/1/1")
                .accept(MediaType.APPLICATION_JSON);

        when(service.registerUserForEvent(anyLong(),anyLong(),anyString())).thenReturn(true);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().string("Success"))
                .andReturn();
    }
}
