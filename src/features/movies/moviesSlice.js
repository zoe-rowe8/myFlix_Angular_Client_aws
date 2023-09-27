import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyflixAPIService from "../../services/myflixAPI.service";

const initialState = {
  data: [],
  userMovieImageList: {},
  searchString: "",
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (token) => {
    return await MyflixAPIService.fetchMovies(token);
  }
);

export const fetchUserMovieImageList = createAsyncThunk(
  "movies/fetchUserMovieImageList",
  async ({ userId, movieId, token }) => {
    const response = await MyflixAPIService.fetchUserMovieImageList(
      userId,
      movieId,
      token
    );
    return {
      movieId: movieId,
      imageList: response.Contents,
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies() {
      return initialState;
    },
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...action.payload];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserMovieImageList.fulfilled, (state, action) => {
        state.userMovieImageList[action.payload.movieId] =
          action.payload.imageList;
      });
  },
});

export const { clearMovies, setSearchString } = moviesSlice.actions;

export default moviesSlice.reducer;
