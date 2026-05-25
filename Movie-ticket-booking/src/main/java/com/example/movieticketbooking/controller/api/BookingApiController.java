package com.example.movieticketbooking.controller.api;

import com.example.movieticketbooking.model.Ticket;
import com.example.movieticketbooking.model.User;
import com.example.movieticketbooking.service.BookingService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/booking")
public class BookingApiController {

    private final BookingService bookingService;

    public BookingApiController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmBooking(@RequestBody Map<String, Object> body, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));
        }

        try {
            Long showId = Long.valueOf(body.get("showId").toString());
            @SuppressWarnings("unchecked")
            List<String> seatNumbers = (List<String>) body.get("seatNumbers");

            Ticket ticket = bookingService.bookTickets(loggedInUser.getId(), showId, seatNumbers);
            return ResponseEntity.ok(ticketToMap(ticket));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> bookingHistory(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));
        }

        List<Ticket> tickets = bookingService.getTicketsByUserId(loggedInUser.getId());
        List<Map<String, Object>> result = tickets.stream().map(this::ticketToMap).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    private Map<String, Object> ticketToMap(Ticket ticket) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", ticket.getId());
        map.put("seatNumbers", ticket.getSeatNumbers());
        map.put("totalPrice", ticket.getTotalPrice());
        map.put("bookingTime", ticket.getBookingTime().toString());
        map.put("movieTitle", ticket.getShow().getMovie().getTitle());
        map.put("moviePosterUrl", ticket.getShow().getMovie().getPosterUrl());
        map.put("theaterName", ticket.getShow().getTheater().getName());
        map.put("showTime", ticket.getShow().getShowTime().toString());
        return map;
    }
}
