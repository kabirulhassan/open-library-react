import React from "react";

const BooksTableComponent = (props) => {
    const returnLatestPublishYear = (publish_year) => {
        let latestPublishYear = parseInt(publish_year[0]);
        for(const year of publish_year){
            if(parseInt(year) > latestPublishYear){
                latestPublishYear = parseInt(year);
            }
        }
        return latestPublishYear;
    }
    const {books} = props;
    if(books?.works){
        books.docs = books.works;
        delete books.works;
    }
    return (
        <div className="books-table">
        {books?.docs ? books?.docs?.length > 0?
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title and Sub Title</th>
                        <th>Author</th>
                        <th>Latest Publish Year</th>
                        <th>First Publish Year</th>
                    </tr>
                </thead>
                <tbody>
                    {books.docs && books.docs.map((book) => (
                        <tr key={book?.key}>
                            <td>{book?.title}</td>
                            {/* <td>{book?.author_name?book.author_name:book.authors&&book?.authors[0]?.name}</td> */}
                            <td>{book?.author_name?book.author_name:book.authors&&book?.authors.map((author, index, authors)=> ((index+1 === authors.length)? author.name+"":author.name+", "))}</td>
                            <td>{book?.publish_year?returnLatestPublishYear(book?.publish_year):book?.first_publish_year}</td>
                            <td>{book?.first_publish_year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        : <><h3>No Records Found</h3></>:<></>
        }
    </div>
    );
}

export default BooksTableComponent;