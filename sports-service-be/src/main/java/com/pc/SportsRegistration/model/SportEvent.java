package com.pc.SportsRegistration.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.*;

@Entity(name = "sports_events_vw")
public class SportEvent {
    @Id
    long id;
    String eventName;
    String eventCategory;
    Timestamp startTime;
    Timestamp endTime;

    public SportEvent() {
    }

    public SportEvent(long id, String eventName, String eventCategory, Timestamp startTime, Timestamp endTime) {
        this.id = id;
        this.eventName = eventName;
        this.eventCategory = eventCategory;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventCategory() {
        return eventCategory;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }
}
