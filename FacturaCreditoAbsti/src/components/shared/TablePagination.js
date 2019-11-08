import React, { Component } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';

export default class TablePagination extends Component {

    constructor(props){
        super(props)

        this.state = {
             selectedPage: 1,
        }

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.createPagination = this.createPagination.bind(this);
    }


    handlePaginationClick(e, type){
        console.log(type)
        
        const {amountPages} = this.props;
        const {selectedPage} = this.state;

        if(type !== undefined){
            
            switch(type){
                case "page":
                
                let page = Number(e.target.id);
                this.setState((state) => ({ ...state, selectedPage: page}));
                this.props.selectionChanges(page);
                break
                case "first":
                this.setState((state) => ({ ...state, selectedPage: 1 }));
                this.props.selectionChanges(1);
                
                break
                case "last" :
                this.setState((state) => ({ ...state, selectedPage: amountPages}));
                this.props.selectionChanges(amountPages);
                
                break
                case "prev" :
                this.setState((state) => ({ ...state, selectedPage: selectedPage - 1 }));
                this.props.selectionChanges(selectedPage - 1);
                
                break
                case "next" :
                this.setState((state) => ({ ...state, selectedPage: selectedPage  + 1 }));
                this.props.selectionChanges(selectedPage  + 1 );
                
                break
            }

        }
       

        
        
        
    }
    createPagination(){
        let pages = []
        const {amountPages} = this.props;
        const {selectedPage} = this.state;
        for (let index = 0; index < amountPages ; index++) {
            
            pages.push(<Pagination.Item active={selectedPage == index+1 }  name={index+1} onClick={(e)=>this.handlePaginationClick(e,"page")} value={index+1} id={index+1}>{index+1}</Pagination.Item>)
            if(index +1 > 10){
                pages.push(<Pagination.Ellipsis disabled/>)
                return pages
            }
        }
        return pages;
    }
    render() {
        const {selectedPage } = this.state;
        const {amountPages} = this.props;
        return (
            <div>
                            <Pagination>
                            <Pagination.First name="first" onClick={(e)=>this.handlePaginationClick(e,"first")}  />
                            <Pagination.Prev disabled={selectedPage === 1} name="prev" onClick={(e)=>this.handlePaginationClick(e,"prev")} />
                           {(this.createPagination())}
                            <Pagination.Next disabled={selectedPage === amountPages} name="next" onClick={(e)=>this.handlePaginationClick(e,"next")}  />
                            <Pagination.Last name="last" onClick={(e)=>this.handlePaginationClick(e,"last")} />
                        </Pagination>
            </div>
        )
    }
}
