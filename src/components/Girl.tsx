type GirlProps = {
  className?: string;
};

function Girl({
  className = "",
}: GirlProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}girl.png`}
      className={className}
    />
  );
}

export default Girl;