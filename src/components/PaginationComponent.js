import {FaCaretLeft, FaCaretRight} from 'react-icons/fa';

const PaginationComponent = ({ totalResults, offset, setOffset }) => {
    const handleOffsetChange = (change) => {
        change = parseInt(change);
        if(offset + change >= 0 && offset + change < totalResults.current) {
            setOffset(offset + change);
            console.log("change: ", change,"offset: ", offset, "totalResults: ", totalResults);
        }
    };
    return (
        totalResults.current > 0 &&
        <div className="pagination row">
            <button onClick={()=>{handleOffsetChange(-10)}}><FaCaretLeft/> Previous</button>
            <button onClick={()=>{handleOffsetChange(+10)}}><FaCaretRight/> Next</button>
        </div>
    );
};

export default PaginationComponent;