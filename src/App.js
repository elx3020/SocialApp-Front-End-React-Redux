import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'
import axios from "axios";


//  decode token
import jwtDecode from "jwt-decode";
//  redux

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

// *components

import NavBar from "./components/NavBar";

//* pages
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import Profilepage from "./pages/ProfilePage";
import PostDetailsPage from "./pages/postDetailPage";
// * Custom Routes

//  authorization routes
import AuthRoute from "./custom_routes/AuthRoute";

  

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);  //decoded token object
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    
  }else{
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }

}





// *routes
// some routes need to be authorized in this scenerio we use our authenticated variable which signals when the token has expired if the token has expired
const routes = (<Switch>
  <Route exact path="/">
    <HomePage/>
  </Route>
  <AuthRoute path="/login" component={LoginPage}/> 
  <AuthRoute path="/signup" component={SignUpPage} />
  <Route path="/profile/:handle" component={Profilepage} />
  <Route path="/post/:post_handle" component={PostDetailsPage} />
</Switch>);



function App() {



  return (
    <div>
      <Provider store={store}>
        <Router>
          <NavBar/>
          {/* routes using switch */}
          {routes}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
