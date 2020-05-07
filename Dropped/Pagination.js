import React from 'react'

function Pagination({todoPerPage, total, paginate}) {
    const pageNumber = []
    let y = Math.ceil(total/todoPerPage)

    for (let i = 0; i < y; i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map(num => (
                    <li key={num} className="page-item">
                        <a onClick={()=> paginate(num)} href="!#"> {num} </a>
                    </li>
                ))}

            </ul>
        </nav>
    )
}

export default Pagination