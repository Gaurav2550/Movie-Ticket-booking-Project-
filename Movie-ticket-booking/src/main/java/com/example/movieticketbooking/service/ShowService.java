package com.example.movieticketbooking.service;

import com.example.movieticketbooking.model.Show;
import com.example.movieticketbooking.model.ShowSeat;
import com.example.movieticketbooking.repository.ShowRepository;
import com.example.movieticketbooking.repository.ShowSeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowService {

    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;

    public ShowService(ShowRepository showRepository, ShowSeatRepository showSeatRepository) {
        this.showRepository = showRepository;
        this.showSeatRepository = showSeatRepository;
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public List<Show> getShowsByMovieId(Long movieId) {
        return showRepository.findByMovieId(movieId);
    }

    public Optional<Show> getShowById(Long id) {
        return showRepository.findById(id);
    }

    public Show saveShow(Show show) {
        return showRepository.save(show);
    }

    public List<ShowSeat> getSeatsByShowId(Long showId) {
        return showSeatRepository.findByShowId(showId);
    }
}
