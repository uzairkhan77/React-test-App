import React, { Component } from 'react'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { PokemonCard } from './PokemonCard';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8, 
        category: 'general',
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number, 
        category: PropTypes.string,
      }

    constructor(){
        super();
        this.state = {
            articles: [],
            allPokemon: [],
            nextPokemon: [],
            PreviousPokemon: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){ 
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=1&pageSize=${this.props.pageSize}`;
        let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData.next); 
        this.setState({
            nextPokemon: parsedData.next,
            PreviousPokemon: parsedData.previous,
            allPokemon: parsedData.results,
            loading: false})
    }

     handlePrevClick = async ()=>{
        console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let url = `${PreviousPokemon}`;
        let url = this.PreviousPokemon;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
        this.setState({
            nextPokemon: this.state.parsedData.next,
            PreviousPokemon: this.state.parsedData.previous,
            allPokemon: this.state.parsedData.results,
            loading: false
        })
    }
    
     handleNextClick = async ()=>{
        console.log("Next"); 
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = this.nextPokemon;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json() 
            this.setState({
                nextPokemon: this.state.parsedData.next,
                PreviousPokemon: this.state.parsedData.previous,
                allPokemon: this.state.parsedData.results,
                loading: false
            })
    }
        }

    render() { 
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '35px 0px'}}> All Pokemon</h1>
                {this.state.loading && <Spinner/>}
                <div className="row"> 
                {!this.state.loading && this.state.allPokemon.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        
                        <PokemonCard name={element.name} url = {element.url} />
                    </div> 
                })} 
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                
            </div>
        )
    }
}

export default News
