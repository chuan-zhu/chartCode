// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Admin from './pages/admin/admin'

/*
应用的根组件
 */
export default class App extends Component {


  render () {
    return (
      <BrowserRouter>
        <Switch> {/*只匹配其中一个*/}
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
