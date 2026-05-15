type Expression =
  | "normal"
  | "down"
  | "closed";

type GirlProps = {
  className?: string;
  expression?: Expression;
};

const expressionImages: Record<
  Expression,
  string
> = {
  normal: "images/girl/girl_normal.png",

  down: "images/girl/girl_down.png",

  closed: "images/girl/girl_closed.png",
};

function Girl({
  className = "",
  expression = "normal",
}: GirlProps) {

  const image =
    expressionImages[expression];

  return (

    <img
      className={className}
      src={`${import.meta.env.BASE_URL}${image}`}
      alt=""
      draggable={false}
    />

  );

}

export default Girl;