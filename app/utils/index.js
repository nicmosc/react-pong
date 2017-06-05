export function ai(ball, paddle) {
  const { x, y } = ball;
  const { height } = paddle;

  // const randomNumber = Math.floor(Math.random() * (height + height)) - height;

  const newPosition = randomNumber + y + height / 2;

  console.log(randomNumber);

  return newPosition;
}
