type GirlProps = {
  className?: string;
};

function Girl({
  className = "",
}: GirlProps) {
  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}girl.png`}
      alt=""
      draggable={false}
    />
  );
}

export default Girl;