type LogoProps = {
  size?: 'sm' | 'lg';
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

  return (
    <div className='text-right text-3xl font-bold leading-none'>
      <span>WhereWe</span>
      <span className='text-primary text-4xl font-black'>GO!</span>
    </div>
  );
}
