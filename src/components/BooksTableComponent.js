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
    return (
        books?.docs?.length > 0?
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
                        <tr key={book.key}>
                            <td>{book.title}</td>
                            <td>{book.author_name}</td>
                            <td>{book.publish_year&&returnLatestPublishYear(book.publish_year)}</td>
                            <td>{book.first_publish_year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        : <></>
    );
}

export default BooksTableComponent;