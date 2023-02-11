
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
        <div className="pagination">
            <button onClick={()=>{handleOffsetChange(-10)}}>Previous</button>
            <button onClick={()=>{handleOffsetChange(+10)}}>Next</button>
        </div>
    );
};

export default PaginationComponent;