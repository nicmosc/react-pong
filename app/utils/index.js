import { constants } from 'components/Paddle';


export function ai(ball, paddle) {
  const { x, y, ySpeed } = ball;
  const { height, speed } = constants;

  const absoluteSpeed = Math.abs(ySpeed);

  if (y >= paddle.y + height / 2) {
    if (absoluteSpeed > speed) {
      return paddle.y + speed;
    }
    return paddle.y + absoluteSpeed;
  }
  else {
    if (absoluteSpeed > speed) {
      return paddle.y - speed;
    }
    return paddle.y - absoluteSpeed;
  }
}
