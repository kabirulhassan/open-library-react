import React from "react";

const BooksTableComponent = (props) => {
    const {books} = props;
    return (
        books?.docs?.length > 0?
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {books.docs && books.docs.map((book) => (
                        <tr key={book.key}>
                            <td>{book.title}</td>
                            <td>{book.author_name}</td>
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