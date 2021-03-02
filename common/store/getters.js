const getters = {
  name: state => state.user.information.name,
  grade: state => state.user.information.grade,
  avatar: state => state.user.information.avatar,
  token: state => state.user.token,
  
  hygienist_code: state => state.life.hygienist_code,
  knowing_code: state => state.life.knowing_code,
  work_type: state => state.life.work_type,
  
  floor_now: state => state.life.floor_now,
  layer_now: state => state.life.layer_now,
  room_now: state => state.life.room_now,
  
  ask_now: state => state.ask.ask_now,
  ask_all: state => state.ask.ask_all,
  leave_type: state => state.ask.leave_type,
  monitor: state => state.ask.monitor
}
export default getters
