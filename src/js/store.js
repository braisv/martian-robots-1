export const lostList = []; //manages grid points of lost robots

const _robots = new WeakMap();
export default class Store {
  constructor() {
    _robots.set(this, new Map());
  }
  
  add(...robot) {
    const robots = _robots.get(this);
    
    robot.forEach(r => {
      try {
        if(["Martian", "Robot"].includes(r.type()))
          robots.set(r.name, r);
      }
      catch(e) {
        throw new Error("Can only store Martians and Robots.");
      }
    });
    
    return robots.size;
  }
  
  update(robot){
    const robots = _robots.get(this);
    
    if(robots.has(robot.name))
      robots.set(robot.name, robot);
    
    return robots.has(robot.name);
  }
  
  remove(robotName) {
    const robots = _robots.get(this);
    return robots.delete(robotName);
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