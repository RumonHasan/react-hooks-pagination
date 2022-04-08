import React, {useContext, useState} from "react";
import { PageContext } from "../App";

const Paginate = ()=>{
    const {postsPerPage, currentPageIndex, posts, paginateFunc} = useContext(PageContext);
    const pageRange = [];// page range;

    const pageNumberStyles = {
        padding: '5px',
        margin: '5px',
    }

    // starting page range
    const [pageLimit, setPageLimit] = useState(5);
    const [minPageRange, setMinPageRange] = useState(0);
    const [maxPageRange, setMaxPageRange] = useState(5);

    // generates the page numbers of per section
    for(let index= 1; index < Math.ceil(posts.length/ postsPerPage); index++){
        pageRange.push(index);
    }

    return (
        <div style={{display:'flex'}}>
            {pageRange.map((pageNumber)=>{
                return (
                    <button onClick={()=>paginateFunc(pageNumber)} style={pageNumberStyles}>
                        {pageNumber}
                    </button>
                )
            })}
        </div>
    )
};

export default Paginate;