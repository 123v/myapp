import React, { Component } from 'react'
import {Row, Col} from 'antd'
import '../component/movie.scss'

export default class MovieCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: 0,
            image:'', 
            title:'', 
            sub_title:'', 
            desc:'', 
            genre:[], 
            genre_desc:'', 
            release_date:'', 
            running_time:'', 
            box_office:'', 
            vote_average:''
        }
    }

    componentDidMount = () => {
        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id')
        
        let movieList = JSON.parse(window.localStorage.getItem('movieList'))
        if (movieList && movieList.length > 0) {
            for (const item of movieList) {
                if (Number(item.id) === Number(id)) {
                    this.setState({
                        id: item.id,
                        image: item.image,
                        title: item.movie_name,
                        sub_title: item.sub_title,
                        desc: item.desc,
                        genre: item.genre,
                        genre_desc: item.genre_desc,
                        release_date: item.release_date,
                        box_office: item.box_office,
                        vote_average: item.vote_average,
                        running_time: item.running_time
                    })
                }
            }
        }
    }
    
    
    render() {
        const { image, title, sub_title, desc, genre, genre_desc, release_date, running_time, box_office, vote_average } = this.state
        return (
            <React.Fragment>
                <header className="header">
                    <h1 className="title">Movies</h1>
                    <p className="back" onClick={() => this.props.history.push('/')}>Back</p>
                </header>
                <div className="movie-card-container" style={{backgroundImage: `url(${image})`}}>
                    <div className="movie-card-details-container">
                        <Row>
                            <Col xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }} span={8}>
                                <img src={image} alt={title} />
                            </Col>
                            <Col xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }} span={16}>
                                <div className="movie-card-header">
                                    <h3>{title}</h3>
                                    <h6>{sub_title}</h6>
                                    <p>{desc}</p>
                                </div>
                                <div className="movie-card-genre">
                                    <div className="genres">{genre.map(v => (<h6>{v}</h6>))}</div>
                                    <p className="genre_desc">{genre_desc}</p>
                                </div>
                                <div className="movie-card-details">
                                    <Row gutter={[0, 20]}>
                                        <Col span={12}>
                                            <h6>Original Release:</h6>
                                            <h5>{release_date}</h5>
                                        </Col>
                                        <Col span={12}>
                                            <h6>Running Time:</h6>
                                            <h5>{running_time}</h5>
                                        </Col>
                                    </Row>
                                    <Row gutter={[0, 20]}>
                                        <Col span={12}>
                                            <h6>Box Office:</h6>
                                            <h5>${box_office}</h5>
                                        </Col>
                                        <Col span={12}>
                                            <h6>Vote Average:</h6>
                                            <h5>{vote_average}/10</h5>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
