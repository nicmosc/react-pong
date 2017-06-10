import { constants } from 'components/Paddle';


export function ai(ball, paddle) {
  const { x, y, ySpeed } = ball;
  const { height, speed } = constants;

  const absoluteSpeed = Math.abs(ySpeed);
  const aiSpeed = speed + 10;

  if (y >= paddle.y + height / 2) {
    if (absoluteSpeed > aiSpeed) {
      return paddle.y + aiSpeed;
    }
    return paddle.y + absoluteSpeed;
  }
  else {
    if (absoluteSpeed > aiSpeed) {
      return paddle.y - aiSpeed;
    }
    return paddle.y - absoluteSpeed;
  }
}
