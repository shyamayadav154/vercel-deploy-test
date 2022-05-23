import moment from 'moment';

export const yearRange = Array.from(
  { length: 50 },
  (_, i) => moment().add(4, 'years').format('yyyy') - i
);

export const blurData = (data) => {
  if (!data ) return <span style={{filter:'blur(4px)', userSelect:'none'}} >Information</span>;

  if(data === 'NaN') return <span style={{filter:'blur(4px)', userSelect:'none'}}>Information</span>;

  return data;
};


export const blurDataLong = (data) => {
  if (!data ) return <span style={{filter:'blur(4px)'}}>Information given here is to long to show</span>;


  return data;
};
