export const lostList = ["10,12", "9,15"]; //manages grid points of lost robots

const _robots = new WeakMap();
export default class Store {
  constructor() {
    _robots.set(this, new Map());
  }
  
  add(robot) {
    const robots = _robots.get(this);
    robots.set(robot.name, robot);
  }
  
  update(robot){
    this.add(robot);
  }
  
  remove(robotName) {
    const robots = _robots.get(this);
    robots.delete(robotName);
  }
  
  get(robotName) {
    const robots = _robots.get(this);
    return robots.get(robotName);
  }
  
  getAll() {
    const robots = _robots.get(this);
    return robots;
  }
}