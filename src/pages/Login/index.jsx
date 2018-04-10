import React, { Component } from 'react';
import Storage from '../../components/Storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      favoriteMovie: '',
      isFetching: false,
    };
  }
  fetchData = (save) => {
    this.setState({ isFetching: true });
    const user = {
      username: 'xiaoma',
      favoriteMovie: 'The Fast and the Furious',
    };
    save('username', user.username);
    save('favoriteMoive', user.favoriteMovie);
    this.setState({
      username: user.username,
      favoriteMovie: user.favoriteMovie,
      isFetching: false,
    });
  }
  render() {
    return (
      <div>
        <span>this is a login page.</span>
        <Storage render={({ load, save }) => {
          const username = load('username') || this.state.username;
          const favoriteMovie = load('favoriteMovie') || this.state.favoriteMovie;
          if (!username || !favoriteMovie) {
            if (!this.state.isFetching) {
              this.fetchData(save);
            }
            return (<div>loading</div>);
          }
          return (
            <div>My username is {username}, and I love to watch {favoriteMovie}.</div>
          );
        }}
        />
      </div>
    );
  }
}

export default Login;
