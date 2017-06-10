import { constants } from 'components/Paddle';


export function ai(ball, paddle) {
  const { x, y, ySpeed } = ball;
  const { height, speed } = constants;

  const ballSpeed = Math.abs(ySpeed);

  if (y >= paddle.y + height / 2) {
    if (ballSpeed > height / 2) {
      return paddle.y + speed;
    }
    return paddle.y + ballSpeed;
  }
  else {
    if (ballSpeed > height / 2) {
      return paddle.y - speed;
    }
    return paddle.y - ballSpeed;
  }

  // if (y >= paddle.y + height / 2) {
  //   if (y + ballSpeed < paddle.y + height / 2 || (ySpeed > 0 && y + ballSpeed > paddle.y + height / 2)) {
  //     return paddle.y + speed;
  //   }
  //   return paddle.y + ballSpeed;
  // }
  // else {
  //   if (y + ballSpeed < paddle.y + height / 2 || (ySpeed < 0 && y + ballSpeed < paddle.y + height / 2)) {
  //     return paddle.y - speed;
  //   }
  //   return paddle.y - ballSpeed;
  // }
}
