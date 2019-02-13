import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    this.fetchPosts()
  }
  fetchPosts = () => {
    fetch('http://localhost:8000/api/posts', {method: "GET"}).then( async res => {
      const transformedPosts = await res.json();
      this.setState({posts: transformedPosts})
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="App">
        <ul>
          {this.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
