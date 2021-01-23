import React, { Component } from 'react'
import { Row, Col, Tag } from 'antd'
import './movie.scss'

export default class MovieRow extends Component {

    redirection = (id) => {
        this.props.history.push({ pathname: '/moviedetail', search:'?id='+id })
    }

    render() {
        const { id, image, movie_name, release_date, tags, duration} = this.props.data
        let release_year = release_date.split("-")[0]
        return (

            <>
                <div className="movie-row" onClick={() => this.redirection(id)}>
                    <div className="movie-poster" style={{backgroundImage: `url("${image}")`}} />
                    <Row className="movie-info">
                        <Col lg={16} md={24} sm={24} xs={24} className="movie-name">{movie_name}</Col>
                        <Col lg={2} md={8} sm={8} xs={24}>{release_year}</Col>
                        <Col lg={4} md={8} sm={8} xs={24}>{
                            tags && tags.map((tag, index) => {
                                return (
                                    <Tag key={index} closable={false} closeIcon={null}>{tag}</Tag>
                                    )
                                })
                        }</Col>
                        <Col lg={2} md={8} sm={8} xs={24}>{duration}</Col>
                    </Row>
                </div>
            </>
        )
    }
}
