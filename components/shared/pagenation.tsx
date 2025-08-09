import React from 'react';
import { Button } from '../ui/button';

type PaginationProps = {
    page: number;
    setPage: (page: number) => void;
    length: number;
    limit: number;
};

const Pagination: React.FC<PaginationProps> = ({page, setPage, length, limit}) => {
    return (
      
        <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button variant="outline" disabled={length < limit} onClick={() => setPage(page + 1)}>
              Next
            </Button>
        </div>
    );
};

export default Pagination;