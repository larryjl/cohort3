const functions = {
  forward(point, distance, direction) {
    // direction is an array: [1,0], [-1,0], [0,1] or [0,-1]
    return {
      point: point.map((v,i) => (
        v + (distance * direction[i])
      )),
      direction: direction
    };
  },
  turnLeft(point, prevDirection) {
    let [x, y] = prevDirection;
    // convert signed -0 to 0
    return {
      point: point,
      direction: [(-y)?-y:0, x]
    };
    // switch (prevDirection) {
    //   case [0,1]:
    //     return [-1,0];
    //   case [-1,0]:
    //     return [0,-1];
    //   case [0,-1]:
    //     return [1,0];
    //   case [1,0]:
    //     return [0,1];
    //   default:
    //     return [1,0];
    // };
  },
  turnRight(point,prevDirection) {
    let [x, y] = prevDirection;
    return {
      point: point,
      direction: [y, (-x)?-x:0]
    };
  }
};

export default functions;