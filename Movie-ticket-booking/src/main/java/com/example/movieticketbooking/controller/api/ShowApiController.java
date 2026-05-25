package com.example.movieticketbooking.controller.api;

import com.example.movieticketbooking.model.Show;
import com.example.movieticketbooking.model.ShowSeat;
import com.example.movieticketbooking.service.ShowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shows")
public class ShowApiController {

    private final ShowService showService;

    public ShowApiController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Map<String, Object>>> getShowsByMovie(@PathVariable Long movieId) {
        List<Show> shows = showService.getShowsByMovieId(movieId);
        List<Map<String, Object>> result = shows.stream().map(show -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", show.getId());
            map.put("showTime", show.getShowTime().toString());
            map.put("ticketPrice", show.getTicketPrice());
            map.put("ticketsAvailable", show.getTicketsAvailable());
            map.put("theaterName", show.getTheater().getName());
            map.put("theaterCity", show.getTheater().getCity());
            map.put("movieTitle", show.getMovie().getTitle());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShow(@PathVariable Long id) {
        return showService.getShowById(id).map(show -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", show.getId());
            map.put("showTime", show.getShowTime().toString());
            map.put("ticketPrice", show.getTicketPrice());
            map.put("ticketsAvailable", show.getTicketsAvailable());
            map.put("theaterName", show.getTheater().getName());
            map.put("theaterCity", show.getTheater().getCity());
            map.put("movieTitle", show.getMovie().getTitle());
            map.put("moviePosterUrl", show.getMovie().getPosterUrl());
            return ResponseEntity.ok(map);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<Map<String, Object>>> getSeats(@PathVariable Long id) {
        List<ShowSeat> seats = showService.getSeatsByShowId(id);
        List<Map<String, Object>> result = seats.stream().map(seat -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", seat.getId());
            map.put("seatNumber", seat.getSeatNumber());
            map.put("booked", seat.isBooked());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
