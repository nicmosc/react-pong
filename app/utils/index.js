import { constants } from 'components/Paddle';


export function ai(ball, paddle) {
  const { x, y, ySpeed } = ball;
  const { height, speed } = constants;

  const ballSpeed = Math.abs(ySpeed);
  const paddleExtreme = paddle.y + height / 2;

  if (y >= paddleExtreme) {
    if (Math.abs(y + ballSpeed - paddleExtreme) > height) {
      return paddle.y + (speed - 2);
    }
    return paddle.y + ballSpeed;
  }
  else {
    if (Math.abs(y + ballSpeed - paddleExtreme) > height) {
      return paddle.y - (speed - 2);
    }
    return paddle.y - ballSpeed;
  }
}
