const getters = {
  name: state => state.user.information.name,
  grade: state => state.user.information.grade,
  avatar: state => state.user.information.avatar,
  token: state => state.user.token,
  
  //任务
  hygienist_code: state => state.life.hygienist_code,
  knowing_code: state => state.life.knowing_code,
  work_type: state => state.life.work_type,
  
  //寝室
  floor_now: state => state.SchoolAttendance.floor_now,
  layer_now: state => state.SchoolAttendance.layer_now,
  room_now: state => state.SchoolAttendance.room_now,
  task_now: state => state.SchoolAttendance.task_now,
  
  // 晚自修
  class_list: state => state.SchoolAttendance.class_list,
  roll_call_list: state => state.SchoolAttendance.roll_call_list,
  vd_rull_list: state => state.SchoolAttendance.vd_rull_list,
  
  // 请假
  ask_now: state => state.ask.ask_now,
  ask_all: state => state.ask.ask_all,
  leave_type: state => state.ask.leave_type,
  monitor: state => state.ask.monitor
}
export default getters
