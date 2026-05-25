package com.example.movieticketbooking.config;

import com.example.movieticketbooking.model.*;
import com.example.movieticketbooking.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final TheaterRepository theaterRepository;
    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;

    public DataInitializer(UserRepository userRepository, MovieRepository movieRepository, TheaterRepository theaterRepository, ShowRepository showRepository, ShowSeatRepository showSeatRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.theaterRepository = theaterRepository;
        this.showRepository = showRepository;
        this.showSeatRepository = showSeatRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (movieRepository.count() > 0) return;

        User admin = new User("admin", "admin123", "admin@example.com", Role.ADMIN);
        User user = new User("user", "user123", "user@example.com", Role.USER);
        userRepository.save(admin);
        userRepository.save(user);

        Movie m1 = new Movie("Inception", "A thief who steals corporate secrets through the use of dream-sharing technology.", 148, "English", "Sci-Fi", "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQGNV5Pu5.jpg");
        Movie m2 = new Movie("Interstellar", "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 169, "English", "Sci-Fi", "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg");
        Movie m3 = new Movie("The Dark Knight", "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.", 152, "English", "Action", "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg");
        
        movieRepository.save(m1);
        movieRepository.save(m2);
        movieRepository.save(m3);

        Theater t1 = new Theater("Starlight Cinemas", "New York", "123 Broadway St");
        Theater t2 = new Theater("Grand Theater", "Los Angeles", "456 Hollywood Blvd");
        theaterRepository.save(t1);
        theaterRepository.save(t2);

        Show s1 = new Show(m1, t1, LocalDateTime.now().plusDays(1).withHour(18).withMinute(0).withSecond(0), 250.0, 50);
        Show s2 = new Show(m1, t2, LocalDateTime.now().plusDays(1).withHour(20).withMinute(30).withSecond(0), 350.0, 50);
        Show s3 = new Show(m2, t1, LocalDateTime.now().plusDays(2).withHour(19).withMinute(0).withSecond(0), 300.0, 50);
        
        showRepository.save(s1);
        showRepository.save(s2);
        showRepository.save(s3);

        createSeats(s1);
        createSeats(s2);
        createSeats(s3);
    }

    private void createSeats(Show show) {
        String[] rows = {"A", "B", "C", "D", "E"};
        for (String row : rows) {
            for (int i = 1; i <= 10; i++) {
                showSeatRepository.save(new ShowSeat(show, row + i, false));
            }
        }
    }
}
