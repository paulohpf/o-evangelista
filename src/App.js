import React from 'react';
import {Container} from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom"
import * as WordPressAPI from './Utils/WordPressApi';
import './App.scss';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
// import Textos from './components/Textos/Textos'
import SearchForm from './components/Search/SearchForm'
import SearchResults from './components/Search/SearchResults'
import SinglePost from './components/SinglePost/SinglePost'
import Contato from './components/Contato/Contato'
import Footer from './components/Footer/Footer'

function App() {
  
  function NoMatch({location}) {

    async function showAvatar() {
      const urlPathName = location.pathname.replace('/', '');
      await WordPressAPI.getSinglePost(urlPathName, async function(response){
        console.log(response);
      });
      return 0
    }

    let avatar = showAvatar();
    console.log(avatar);

    // console.log(location);
    return (
      <main className={'site-main'}>
      <section className={'error-404 not-found'}>
        <header className={'page-header'}>
      <h3>
      Opa! A página não pode ser encontrada!
      </h3>
      </header>
      <div className={'page-content'}>
      <p>Parece que nada foi encontrado por aqui. Tente uma busca talvez?</p>
      <SearchForm />
      </div>
      </section>
      </main>
      );
    }
    
    return (
      <Router>
      
      <ScrollToTop>  
      <Header />
      <Container>
      <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/textos" exact component={Textos} /> */}
      <Route path="/contato/" component={Contato} />
      <Route path={`/post/:slug`} component={SinglePost} />
      <Route path={`/search/`} component={SearchResults} />
      <Route component={NoMatch} />
      </Switch>
      
      </Container>
      <Footer />
      </ScrollToTop>
      
      </Router>
      );
    }
    
    export default App;