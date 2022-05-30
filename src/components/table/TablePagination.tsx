import { DEFAULT_LIMIT, PAGE_LIMIT_OPTIONS } from '@/config';
import { Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

interface TablePaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selected: number) => void;
    onPageLimitChange: (selected: number) => void;
    pageLimit?: number;
    pageRangeDisplayed?: number;
    marginPagesDisplayed?: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
    pageCount,
    currentPage,
    onPageChange,
    onPageLimitChange,
    pageLimit = DEFAULT_LIMIT,
    marginPagesDisplayed = 2,
    pageRangeDisplayed = 2,
}) => {
    const handlePageChange = ({ selected }: { selected: number }) =>
        onPageChange(selected);

    const handlePageLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        onPageLimitChange(+e.target.value);

    return (
        <>
            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageChange}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={marginPagesDisplayed}
                pageCount={pageCount}
                previousLabel="< Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                forcePage={currentPage}
            />
            <Form.Select
                className="w-auto shadow-none"
                value={pageLimit}
                onChange={handlePageLimitChange}
            >
                {PAGE_LIMIT_OPTIONS.map(option => (
                    <option key={option} value={option}>
                        {option} / page
                    </option>
                ))}
            </Form.Select>
        </>
    );
};

export default TablePagination;
