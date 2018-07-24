import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";

class Comppp extends Component {
  constructor(props) {
    super(props);
    this.searchDataHandler = this.searchDataHandler.bind(this);
    this.state = {
      hide:false,
      sorted_state:'rank',
      data:[],
     
    };
    this.alldata=[]
  }
  componentDidMount() {
    console.log("inside");
    this.fetchCryptocurrencyData();
  }

  fetchCryptocurrencyData() {
    
    axios.get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => {this.setState({data: response.data});
        this.alldata=response.data;
      })
      .catch(err => console.log(err));
  }

  //sorting Functions
  sortByName = (type) => {
    if (this.state.sorted_state !== type){
      if (type === 'name') {
        this.state.data.sort((a,b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else {
            return 1;
          }
        })
      } else {
        this.setState({
          data: this.state.data.sort((a,b) => {
            return a[type] - b[type];
          })
        })
      }

    } else {
      this.setState({
        data: this.state.data.reverse()
      })
    }
    this.setState({sorted_state: type})
  }

  searchDataHandler(event) {
    console.log("i am inside mysearch event " + this.alldata);
    let filterValue = event.target.value;
       this.setState({data:this.alldata.filter(coin=>{
         return coin.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1;
       })
       }) 
   } 
  render() {
    const { data } = this.state;
    return (
      <div>
        <div class="buttons_for_sorting">
        <SearchBar search={this.searchDataHandler}/>
                 
        </div>
        <div id="bit_data">
          <table id="tableForDisplay">
            <th onClick={()=>this.sortByName('rank')}> ID </th>
            <th onClick={()=>this.sortByName('name')}> Name </th>
            <th onClick={()=>this.sortByName('price_usd')}> Price </th>
            <th onClick={()=>this.sortByName('price_usd')}> Rank </th>
             <th> Symbol </th>
            {data.map(CryptCoin => (
              <tr>
                <td> {CryptCoin.rank} </td>
                <td> {CryptCoin.name} </td>
                <td> {CryptCoin.price_usd} </td>
                <td> {CryptCoin.price_usd} </td>
                <td> {CryptCoin.symbol} </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
export default Comppp;
