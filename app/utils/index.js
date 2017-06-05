export function ai(ball, paddle) {
  const { x, y } = ball;
  const { height } = paddle;

  // const randomNumber = Math.floor(Math.random() * 1 - 1);
  // console.log(x / 20, Math.min( x / 20 , 10));
  // const newPosition = paddle.y + 10;

  if (y >= paddle.y + height / 2) {
    return paddle.y + 10;
    // return paddle.y + Math.min( x / 20 , 10);
  }

  // else if (y <= paddle.y - height / 2) {
  //   return paddle.y - 10;
  // }

  return paddle.y - 10;
}
