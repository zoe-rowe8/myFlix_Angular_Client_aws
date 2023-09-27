const apiURL = "http://myflix-alb-1785359669.eu-central-1.elb.amazonaws.com/v1";

const getUser = async (username, token) => {
  if (!username || !token) {
    console.error("Invalid Credentials");
    return Promise.reject("Invalid Credentials");
  }
  try {
    const response = await fetch(`${apiURL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (username, password) => {
  try {
    const userData = {
      username: username,
      password: password,
    };
    const response = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else if (success) {
      alert(message);
      return Promise.reject(message);
    } else {
      alert("Login Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

const registerUser = async (username, password, email, birthday) => {
  try {
    const userData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    const response = await fetch(`${apiURL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else if (success) {
      alert(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};

const updateUser = async (
  currentUsername,
  username,
  password,
  email,
  birthday,
  token
) => {
  const userData = {
    username: username,
    password: password,
    email: email,
    birthday: birthday,
  };
  try {
    const response = await fetch(`${apiURL}/users/${currentUsername}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      alert("Update Successful");
      return data;
    } else if (success) {
      alert(message);
      return Promise.reject(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
};

const deleteUser = async (username, token) => {
  try {
    const response = await fetch(`${apiURL}/users/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else if (success) {
      alert(message);
      return Promise.reject(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};

const deleteFavoriteMovie = async (username, movieID, token) => {
  try {
    const response = await fetch(
      `${apiURL}/users/${username}/movies/${movieID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const addFavoriteMovie = async (username, movieID, token) => {
  try {
    const response = await fetch(
      `${apiURL}/users/${username}/movies/${movieID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchMovies = async (token) => {
  try {
    const response = await fetch(`${apiURL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { success, message, data } = await response.json();
    if (data) {
      return data.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          description: movie.description,
          imagePath: movie.imagePath,
          genre: movie.genre,
          director: movie.director,
        };
      });
    } else {
      alert(message);
      return Promise.reject(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchUserMovieImageList = async (userId, movieId, token) => {
  try {
    const response = await fetch(
      `${apiURL}/movies/${userId}/userimages/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchUserMovieImage = async (objectKey, token) => {
  try {
    const response = await fetch(`${apiURL}/movies/userimages/${objectKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      const data = await response.blob();
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const uploadUserMovieImage = async (userId, movieId, formData, token) => {
  try {
    const response = await fetch(
      `${apiURL}/movies/${userId}/userimages/${movieId}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { success, message, data } = await response.json();
    if (data) {
      return data;
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  deleteFavoriteMovie,
  addFavoriteMovie,
  fetchMovies,
  fetchUserMovieImageList,
  fetchUserMovieImage,
  uploadUserMovieImage,
};
