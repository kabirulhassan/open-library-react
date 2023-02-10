import React from "react";

const BooksTableComponent = (props) => {
    const returnLatestPublishYear = (publish_year) => {
        const years = publish_year.map((year) => parseInt(year));
        return Math.max(...years);
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