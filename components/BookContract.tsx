import { useEffect } from 'react'
import { createBookContract } from '../factory/BookContractFactory'

const BookContract = () => {
  useEffect(() => {
    createBookContract(
      'Test title',
      'BKT',
      true,
      'QmemFxRp3HaEeiD8oV6K4zmsUeEkiA1bDSY43xbKHoav11'
    );
  });
  return <p>Book Contract</p>;
};

export default BookContract;
