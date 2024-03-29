import React, {Component} from 'react'
import Intro from '../../components/intro/index'
import SeriesList from '../../components/seriesList/index'
import Loader from '../../components/Loader/index';

class Series extends Component{

    state = {
        series:[],
        seriesName: "",
        isFetching: false
      }
    
      componentDidMount(){
        //const series = ["Vikings", "Game Of Thrones"];
        //setTimeout(() => {
        //  this.setState({ series });
        //}, 2000); // The state changes after 2 seconds
        
      }

      onSeriesInputChange = e => {
        this.setState({seriesName: e.target.value, isFetching: true})
        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then(response => response.json())
        .then(json => this.setState({ series: json, isFetching: false}))
      
      }

    render() {
      const { series, seriesName, isFetching} = this.state;
        return (
            <div>
              <Intro message="Here you can find all of your most loved series"/>
              <div>
                <input 
                value={seriesName}
                type="text" 
                onChange={this.onSeriesInputChange}/>
              </div>
              {
                !isFetching && series.length === 0 && seriesName.trim() === ''
                &&
                <p>Please enter series name into the input</p>
              }
              {
                !isFetching && series.length === 0 && seriesName.trim() !== ''
                && 
                <p>No TV series have been found with this name</p>
              }
              {
                isFetching && <Loader />
              }
              {
                !isFetching && <SeriesList list={this.state.series}/>
              }
                
            </div>
        )
    }
}

export default Series;