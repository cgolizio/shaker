import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const SearchStyle = styled.div`
  background: inherit;
  color: ghostwhite;
  display: flex;
  flex-flow: column;
  column-width: auto;
  padding: 20%;
  width: 490px;
  button, input{
    background: rgb(35, 35, 35);
    color: ghostwhite;
    font-size: 14px;
    width: fit-content;
    padding: 0.25rem 0.75rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    box-shadow: -1px -1px 2px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
    :active{
      box-shadow: -1px -1px 1px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
      background: rgb(25, 25, 25);
    }
    :hover{
      box-shadow: -2px -2px 6px rgba(100,100,100, 1), 3px 3px 4px rgba(0,0,0, 1);
    }
  };
`;



const Search = () => {
  const [ searchFor, setSearchFor ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(true);
  const [ error, setError ] = useState(null);


  const handleChange = (e) => {
    const { value } = e.target;
    setSearchFor(value);
  };

  const handleSingleItemSearch = async () => {
    setIsLoaded(false);
    try {
      const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFor}`);
      console.info(result);
      setSearchResults(result.data.drinks);
      setIsLoaded(true);
    } catch (error) {
      if (error) {
        setError(error);
        setIsLoaded(true);
      }
    }
  };

  const handleClick = () => {
    try {
      handleSingleItemSearch();
    } catch (error) {
      if (error) {
        setError(error);
      }
    }
  };

  // submit your search for list of drinks when enter key is pressed
  const handleKeyDown = (e) => {
    const { key } = e;
    key === 'Enter' ?
      handleClick() :
      null;
  };

  const drinkMap = searchResults.map((drink) => {
    return (
      <div
        key={drink.idDrink}
        style={{
          border: '2px solid ghostwhite',
          borderTop: '0px',
          margin: '5%',
          alignItems: 'center',
        }}
      >
        <img
          src={drink.strDrinkThumb}
          style={{
            display: 'block',
            border: '2px solid ghostwhite',
            borderLeft: '0px',
            width: '100%',
            height: 'auto'
          }}
        />
        <a
          style={{
            color: '#54e5ea',
            paddingLeft: '7%',
            fontSize: '28px',
            alignContent: 'center'
          }}
          href={`https://www.thecocktaildb.com/drink/${drink.idDrink}-${drink.strDrink}`}
          rel='noreferrer'
          target='_blank'
        >{drink.strDrink}</a>
      </div>
    );
  });


  return (
    <SearchStyle>
      <div>
        <input
          type='text'
          name='searchFor'
          value={searchFor}
          placeholder='Search for recipes...'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        >
        </input>
        <button
          onClick={handleClick}
        >
          Get Recipes!
        </button>
        {
          error ?
            <div>Error: {error.message}</div> :
            !isLoaded ?
              <div style={{fontSize: '40px'}}>Loading...</div> :
              <div>{drinkMap}</div>
        }
      </div>
    </SearchStyle>
  );
};

export default Search;
