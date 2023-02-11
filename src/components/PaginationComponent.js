import {FaCaretLeft, FaCaretRight} from 'react-icons/fa';

const PaginationComponent = ({ totalResults, offset, setOffset }) => {
    const handleOffsetChange = (change) => {
        change = parseInt(change);
        if(offset + change >= 0 && offset + change < totalResults.current) {
            setOffset(offset + change);
            // console.log("change: ", change,"offset: ", offset, "totalResults: ", totalResults);
        }
    };
    return (
        totalResults.current > 0 &&
        <div className="pagination row">
            <button className="page-button row" disabled={offset===0} onClick={()=>{handleOffsetChange(-10)}}><FaCaretLeft/> Previous</button>
            <button className="page-button row" disabled={offset+10>totalResults.current} onClick={()=>{handleOffsetChange(+10)}}>Next <FaCaretRight/></button>
        </div>
    );
};

export default PaginationComponent;