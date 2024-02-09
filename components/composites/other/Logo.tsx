type LogoProps = {
  size?: 'sm' | 'lg' | 'xl';
};

export default function Logo(props: LogoProps) {
  if (props.size === 'sm') {
    return (
      <div className='text-right text-xl font-bold leading-none'>
        <span>WhereWe</span>
        <span className='text-primary text-2xl font-black'>GO!</span>
      </div>
    );
  }

  if (props.size === 'xl') {
    return (
      <div className='text-right text-6xl font-bold leading-none'>
        <span>WhereWe</span>
        <span className='text-primary text-7xl font-black'>GO!</span>
      </div>
    );
  }

  return (
    <div className='text-right text-3xl font-bold leading-none'>
      <span>WhereWe</span>
      <span className='text-primary text-4xl font-black'>GO!</span>
    </div>
  );
}
