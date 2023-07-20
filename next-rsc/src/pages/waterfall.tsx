import './waterfall.scss';

export default function Waterfall() {
  return <div className='waterfall'>
    {Array.from({ length: 6 }, (_, index) => index + 1).map(item => (
      <div key={item} className='item'>
        {item}
      </div>
    ))}
  </div>
}