import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    //communicate with the controller
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    //logout user
    logout() {
        localStorage.removeItem("user");
    }

    //register an user
    register(firstname, lastname, address, email, phone, password, username, user_type) {
        return axios.post(API_URL + "signup", {
            firstname,
            lastname,
            address,
            email,
            phone,
            password,
            username,
            user_type
        });
    }

    //get current user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();