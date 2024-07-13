import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieCategoryComponent } from '../../components/movie-category/movie-category.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie';
import { tmdbConfig } from '../../constants/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MovieCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  movieService = inject(MovieService)
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcommingMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  bannerMovie!: Movie;
  tmdbConfig = tmdbConfig
   public domSanitise=inject(DomSanitizer);

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((result:any) => {
      this.popularMovies = result.results
      this.bannerMovie = this.popularMovies[0]
      this.movieService.getMovieVideos(this.bannerMovie.id).subscribe((res: any) => {
        console.log(res)
        this.bannerMovie.videoKey = res.results.find((x: any) => x.site = 'Youtube').key

      });
    });

    this.movieService.getTopRatedMovies().subscribe((result: any) => {
      this.topRatedMovies = result.results;
    });

    this.movieService.getNowPlayingMovies().subscribe((result: any) => {
      this.nowPlayingMovies = result.results;
    });

    this.movieService.getUpcomingMovies().subscribe((result: any) => {
      this.upcommingMovies = result.results;
    });
  }

}
