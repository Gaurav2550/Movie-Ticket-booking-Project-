package com.example.movieticketbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne(optional = false)
    @JoinColumn(name = "theater_id", nullable = false)
    private Theater theater;

    @NotNull(message = "Show time is required")
    @Column(nullable = false)
    private LocalDateTime showTime;

    @Column(nullable = false)
    private double ticketPrice;

    private int ticketsAvailable;

    @JsonIgnore
    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShowSeat> seats = new ArrayList<>();

    public Show() {
    }

    public Show(Movie movie, Theater theater, LocalDateTime showTime, double ticketPrice, int ticketsAvailable) {
        this.movie = movie;
        this.theater = theater;
        this.showTime = showTime;
        this.ticketPrice = ticketPrice;
        this.ticketsAvailable = ticketsAvailable;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Movie getMovie() { return movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    public Theater getTheater() { return theater; }
    public void setTheater(Theater theater) { this.theater = theater; }

    public LocalDateTime getShowTime() { return showTime; }
    public void setShowTime(LocalDateTime showTime) { this.showTime = showTime; }

    public double getTicketPrice() { return ticketPrice; }
    public void setTicketPrice(double ticketPrice) { this.ticketPrice = ticketPrice; }

    public int getTicketsAvailable() { return ticketsAvailable; }
    public void setTicketsAvailable(int ticketsAvailable) { this.ticketsAvailable = ticketsAvailable; }

    public List<ShowSeat> getSeats() { return seats; }
    public void setSeats(List<ShowSeat> seats) { this.seats = seats; }
}
