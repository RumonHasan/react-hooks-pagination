import React, {useContext, useState} from "react";
import { PageContext } from "../App";

const Paginate = ()=>{
    const {postsPerPage, setCurrentPageIndex, posts, 
        paginateFunc, currentPageIndex} = useContext(PageContext);
    const pageRange = [];// page range;

    const pageNumberStyles = {
        padding: '5px',
        margin: '5px',
        cursor: 'pointer'
    }

    // starting page range
    const pageLimit = 5;
    const [minPageRange, setMinPageRange] = useState(0); // first page of the range 
    const [maxPageRange, setMaxPageRange] = useState(5); // max page of the range

    // generates the page numbers of per section
    for(let index= 1; index < Math.ceil(posts.length/ postsPerPage); index++){
        pageRange.push(index);
    }

    // display page numbers with a definite range
    const displayPageRange = pageRange.map((singlePageNumber, index)=>{
        if(singlePageNumber >= minPageRange + 1 && singlePageNumber < maxPageRange + 1){
            return (
                <button className= {currentPageIndex === singlePageNumber ? 'active': undefined} key={index} 
                onClick={()=>paginateFunc(singlePageNumber)} style={pageNumberStyles}>
                    {singlePageNumber}
                </button>
            )
        }
    });

    // page controls for next and prev pages 
    const handleNextPage = ()=>{
        setCurrentPageIndex((prevPage)=> prevPage + 1);
        // once the page range hits the last page.. the min and max range is automatically increased
        if(currentPageIndex >= maxPageRange){
            setMinPageRange((prevMinPage)=> prevMinPage + pageLimit);
            setMaxPageRange((prevMaxPage)=> prevMaxPage + pageLimit);
        }
    }
    const handlePrevPage = ()=>{
        setCurrentPageIndex((prevPage)=> prevPage - 1);

        // egde case when current page is last index of prev last page 
        if((currentPageIndex - 1) % pageLimit === 0){
            setMaxPageRange((prevMax)=> prevMax - pageLimit);
            setMinPageRange((prevMin)=> prevMin - pageLimit);
        }
    };

    // jumping entire page range
    const handleRangeJump = ()=>{
        let differenceRange;
        differenceRange = maxPageRange - currentPageIndex;
        setCurrentPageIndex((prevCurrentPage)=> prevCurrentPage + (differenceRange + 1));
        setMaxPageRange((prevMaxRange)=> prevMaxRange + pageLimit);
        setMinPageRange((prevMinRange)=> prevMinRange + pageLimit);
    }
    // jump back entire page range
    const handlePrevRange = ()=>{
        let differenceRange;
        differenceRange = currentPageIndex - minPageRange;
        setCurrentPageIndex((prevCurrentPage)=> prevCurrentPage - differenceRange);
        setMaxPageRange((maxPageRange)=> maxPageRange - pageLimit);
        setMinPageRange((minPageRange)=> minPageRange - pageLimit);
    }

    return (
        <div style={{display:'flex'}}>
            <button onClick={handleRangeJump} style={{cursor:'pointer', marginRight:'5px'}}>Next Range</button>
            <button onClick={handleNextPage} style={{cursor:'pointer'}}>Next</button>
            {displayPageRange}
            <button onClick={handlePrevPage} style={{cursor:'pointer'}}>Previous</button>
            <button onClick={handlePrevRange} style={{cursor:'pointer',  marginLeft:'5px'}}>Previous Range</button>
        </div>
    )
};

export default Paginate;