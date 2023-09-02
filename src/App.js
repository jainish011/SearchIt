import styled from 'styled-components'
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
import { useState } from 'react';
import axios from 'axios';


const API_KEY='4096157c'
const Container = styled.div` 
display:flex;
flex-direction:column;
`; // It is main container where we putting all our other tags

const Header = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
background-color:black;
color:white;
padding:10px;
font-size:25px;
font-weight:bold;
box-shadow: 0 3px 6px #555;
` // Header container will be our navbar. It have 2 parts AppName and SearchBox


const AppName = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`
const SearchBox = styled.div`
display:flex;
flex-direction:row;
padding: 10px 10px;
background-color : white;
margin-left:10px;
width:50%;
border-radius:6px;
align-items:center;
height:50px;
`
const SearchIcon = styled.img`
width:25px;
height:25px;
`
const SearchInput=styled.input`
color:black;
font-size:16px;
font-weight:bold;
border:none;
outline:none;
margin-left:15px;
width:100%;
`

const MovieListContainer = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content: space-evenly;
padding:30px;
gap:25px;
`

function App() {
  const [searchQuery , updateSearchQuery ]=useState() //Here we've used React hook for state management.

  const [timeoutId, updateTimeoutId]=useState(); //using this state for debouncing 

  const [movieList, updateMovieList]=useState([]); // for updating movie list

  const [selectedMovie, onMovieSelect]=useState()
  const fetchData = async(searchString)=>{
    const response= await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    // console.log(response)
    updateMovieList(response.data.Search)
  }
  const onTextChange=(event)=>{ //this function will call when we are typing in our search box
    clearTimeout(timeoutId)
    updateSearchQuery(event.target.value) // it will update our search query
    const timeout=setTimeout(()=>fetchData(event.target.value),500);
    updateTimeoutId(timeout);
  }

  return (
    <div className="App">
      <Container>
        <Header>
          <AppName>Movie Finder</AppName>
          <SearchBox>
            <SearchIcon src='search-icon.svg'/>
            {/* here we put value as our search query which is updating using useSate method */}
            <SearchInput placeholder='Search movie' value={searchQuery} onChange={onTextChange}/> 
          </SearchBox>
        </Header>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
        <MovieListContainer>
          {
            movieList?.length?movieList.map((movie,index)=>{
              return <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
            }): "No Movie Search"
          }
        </MovieListContainer>
      </Container>
    </div>
  );
}

export default App;
