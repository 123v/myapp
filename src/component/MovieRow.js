import React, { Component } from 'react'
import { Row, Col, Tag } from 'antd'
import './movie.scss'

export default class MovieRow extends Component {

    redirection = (id) => {
        console.log(id)
        console.log(this.props.history)
        this.props.history.push({ pathname: '/moviedetail', search:'?id='+id })
    }

    render() {
        // console.log(this.props.data);
        const { id, image, movie_name, release_date, tags, duration} = this.props.data
        let release_year = release_date.split("-")[0]
        return (
            <React.Fragment>
                <Row align="middle" onClick={() => this.redirection(id)} className="custom-row">
                    <Col span={4} flex={1}>
                        <img height={100} width='100%' src={image} alt={movie_name} />
                    </Col>
                    <Col span={8} offset={1}>
                        <h3>{movie_name}</h3>
                    </Col>
                    <Col span={3} offset={1}>
                        <div>{release_year}</div>
                    </Col>
                    <Col span={3} offset={1}>
                        {
                            tags && tags.map((tag, index) => {
                                return(
                                    <Tag key={index} closable={false} closeIcon={null}>{tag}</Tag>
                                )
                            })
                        }
                    </Col>
                    <Col span={6}>
                        <div>{duration}</div>
                    </Col>
                </Row>
                <div className="custome-divider" />
            </React.Fragment>
        )
    }
}
