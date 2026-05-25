package com.example.movieticketbooking.service;

import com.example.movieticketbooking.model.Show;
import com.example.movieticketbooking.model.ShowSeat;
import com.example.movieticketbooking.model.Ticket;
import com.example.movieticketbooking.model.User;
import com.example.movieticketbooking.repository.ShowRepository;
import com.example.movieticketbooking.repository.ShowSeatRepository;
import com.example.movieticketbooking.repository.TicketRepository;
import com.example.movieticketbooking.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final TicketRepository ticketRepository;
    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;
    private final UserRepository userRepository;

    public BookingService(TicketRepository ticketRepository, ShowRepository showRepository, ShowSeatRepository showSeatRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.showRepository = showRepository;
        this.showSeatRepository = showSeatRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Ticket bookTickets(Long userId, Long showId, List<String> seatNumbers) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not found"));

        List<ShowSeat> availableSeats = showSeatRepository.findByShowId(showId);
        
        List<ShowSeat> seatsToBook = availableSeats.stream()
                .filter(seat -> seatNumbers.contains(seat.getSeatNumber()))
                .collect(Collectors.toList());

        if (seatsToBook.size() != seatNumbers.size()) {
            throw new RuntimeException("One or more selected seats are invalid");
        }

        for (ShowSeat seat : seatsToBook) {
            if (seat.isBooked()) {
                throw new RuntimeException("Seat " + seat.getSeatNumber() + " is already booked.");
            }
        }

        // Mark seats as booked
        seatsToBook.forEach(seat -> seat.setBooked(true));
        showSeatRepository.saveAll(seatsToBook);

        // Calculate price
        double totalPrice = show.getTicketPrice() * seatsToBook.size();

        // Update available tickets count
        show.setTicketsAvailable(show.getTicketsAvailable() - seatsToBook.size());
        showRepository.save(show);

        // Create Ticket
        Ticket ticket = new Ticket(show, user, seatNumbers, totalPrice);
        return ticketRepository.save(ticket);
    }
    
    public List<Ticket> getTicketsByUserId(Long userId) {
        return ticketRepository.findByUserId(userId);
    }
}
