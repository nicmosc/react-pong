import { constants } from 'components/Paddle';


export function ai(ball, paddle) {
  const { x, y, ySpeed } = ball;
  const { height, speed } = constants;

  const ballSpeed = Math.abs(ySpeed);
  const paddleExtreme = paddle.y + height / 2;

  if (y >= paddleExtreme) {
    return paddle.y + Math.min(ballSpeed, speed);
  }
  else {
    return paddle.y - Math.min(ballSpeed, speed);
  }
}
