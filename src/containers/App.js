import React, { Component } from 'react'
import './App.scss'
import movieList from '../movielist'
import MovieRow from '../component/MovieRow'
import { Input, Dropdown, Menu, Button, Empty } from 'antd'
import AddMovie from '../component/AddMovie'

export default class App extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			searchText:'',
			allMoviewList: movieList,
			visible: false
		}
	}

	componentDidMount = () => {
		let newMovieList = JSON.parse(window.localStorage.getItem('movieList'))
		if (newMovieList && newMovieList.length > 0) {
			this.setState({allMoviewList: newMovieList})
		} else {
			window.localStorage.setItem('movieList', JSON.stringify(this.state.allMoviewList))
		}
	}
	

	onSearch = (e) => {
		let searchText = e.target.value;
		this.setState({ searchText }, () => {
			let filteredRows = movieList;
			if (searchText.length > 0) {
				filteredRows = filteredRows.filter((item) => {
					return item.movie_name.toString().toLowerCase().includes(searchText.toLowerCase());
				});
			}
			this.setState({ allMoviewList: filteredRows });
		});
	};

	sortMovie = (e) => {
		let movieList = this.state.allMoviewList
		let filteredRows = []

		if (e.key === "0") {
			filteredRows = movieList.sort((a,b) => {
				return a.running_time - b.running_time
			})
		} else if (e.key === "1") {
			filteredRows = movieList.sort((a, b) => {
				return b.running_time - a.running_time
			})
		} else if (e.key === "2") {
			filteredRows = movieList.sort((a, b) => {
				let dateA = new Date(a.release_date),
					dateB = new Date(b.release_date);
				return dateB - dateA
			})
		} else if (e.key === "3") {
			filteredRows = movieList.sort((a, b) => {
				let dateA = new Date(a.release_date),
					dateB = new Date(b.release_date);
				return dateA - dateB
			})
		}

		this.setState({ allMoviewList: filteredRows })
	}
	

	//moto G4 , iphone 6/7/8 plus, ipad , desktop

	getData = async (data) => {
		try {
			console.log("data app.js",data);
			let filteredRows = this.state.allMoviewList
			filteredRows.push(data)
			this.setState({allMoviewList: filteredRows}, () => {
				window.localStorage.setItem('movieList', JSON.stringify(this.state.allMoviewList))
			})
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const menu = (
			<Menu onClick={this.sortMovie}>
				<Menu.Item key="0">
					<div>
						Lowest Duration
      				</div>
				</Menu.Item>
				<Menu.Item key="1">
					<div>
						Highest Duration
      				</div>
				</Menu.Item>
				<Menu.Item key="2">
					<div>
						Latest
      				</div>
				</Menu.Item>
				<Menu.Item key="3">
					<div>
						Oldest
      				</div>
				</Menu.Item>
			</Menu>
		);

		console.log(this.props)
		return (
			<React.Fragment>
				<header className="header">
					<h1 className="title">Movies</h1>
				</header>
				<div className="movie-list-view">
					<div className="filter-options">
						<Dropdown overlay={menu}>
							<div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
								Sort
							</div>
						</Dropdown>
						<Input className='search-input' placeholder="Search Movie" value={this.state.searchText} onChange={this.onSearch} />
						<Button onClick={() => {this.setState({visible: true})}}>Add Movie</Button>
					</div>
					<div className="movie-list">
						{
							this.state.allMoviewList && this.state.allMoviewList.length > 0 ?
							this.state.allMoviewList.map((item, index) => {
								return(<MovieRow key={index} data={item} history={this.props.history} />)
							})
							:
							<Empty 
								description={
									<span>
										No data available
									</span>
								}
							/>
						}
					</div>
				</div>
				{
					this.state.visible ? 
					<AddMovie visible={this.state.visible} onCancel={() => {this.setState({visible: false})}} getData={this.getData} total={this.state.allMoviewList.length} />
					: null
				}
			</React.Fragment>
		)
	}
}
