import { useCallback, useEffect, useState } from 'react';

type Props = {
  array: any[];
  compare: number;
};
const useFindEqual = ({ array, compare }: Props) => {
  const [equalObject, setEqualObject] = useState(array[0]);

  const findEqual = useCallback(() => {
    const isEqual = array.find(({ object }) => object === compare);
    isEqual && setEqualObject(isEqual);
  }, [array, compare]);

  useEffect(() => {
    findEqual();
  }, [findEqual]);
  return equalObject;
};
export default useFindEqual;
