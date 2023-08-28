import React, { Component } from 'react'

export class PokemonCard extends Component {
    render() {
        // let {title, description, imageUrl, newsUrl} = this.props;
        let {name, url} = this.props;

        return (
            <div className="my-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        {/* <p className="card-text">{description}</p> */}
                        <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">show details</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PokemonCard
