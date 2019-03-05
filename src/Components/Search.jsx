import React, { Component } from 'react';
import axios from 'axios';

//unfortunately, attempting to use a stateless component to render the book information was not working out for me.
//So I placed it within this form.

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: '',
            results: [],
            userEnteredInquiry: false,
            noResults: false,
            message: 'Query results will appear here'
        }
    }

    handleInput=(event)=>{
        this.setState({
            userInput: event.target.value
        })
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.userInput}`)
        .then(response=>{
            console.log(response.data)
            if(response.data.totalItems === 0){
                this.setState({
                    noResults: true,
                    userEnteredInquiry: true,
                    message: "No results, please enter again"
                })
                console.log(this.state.results.length)
            } else {
            this.setState({
                results: response.data.items,
                userEnteredInquiry: true,
                userInput: '',
                noResults: false
            })
        }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    render() {
    const { results, message, userEnteredInquiry } = this.state;

    return (
      <div>
          <form>
              <input type="text" onInput={this.handleInput} placeholder="Please enter a query"/>
              <input type="submit" onClick={this.handleSubmit}/>
          </form>
          {(results.length !== 0 && userEnteredInquiry) ? 
            <div className="grid-container">

             {results.map(book=>(
                <div className="container">
                <img id='image' src={book.volumeInfo.imageLinks.smallThumbnail} alt=' ' key={book.id} />
                
                <h3>{book.volumeInfo.title}</h3>
                <p>By {book.volumeInfo.authors === undefined ? "N/A" : book.volumeInfo.authors.join(', ')}</p>
                <p>Publisher: {book.volumeInfo.publisher === undefined ? 'N/A': book.volumeInfo.publisher}</p>
                <a id="link" href={book.volumeInfo.previewLink}>See This Book</a>
                
                </div>
             ))}
             </div>

             : <p id="message">{message}</p>}
      </div>
    );
  }
}

export default Search;