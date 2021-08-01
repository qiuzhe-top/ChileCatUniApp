const getters = {
  name: state => state.user.information.username,
  grade: state => state.user.information.grade,
  avatar: state => state.user.information.avatar,
  token: state => state.user.token,
  
  //任务
  hygienist_code: state => state.life.hygienist_code,
  knowing_code: state => state.life.knowing_code,
  work_type: state => state.life.work_type,
  
  //寝室
  floor_now: state => state.school_attendance.floor_now,
  layer_now: state => state.school_attendance.layer_now,
  room_now: state => state.school_attendance.room_now,
  task_now: state => state.school_attendance.task_now,
  
  // 晚自修
  class_list: state => state.school_attendance.class_list,
  roll_call_list: state => state.school_attendance.roll_call_list,
  vd_rull_list: state => state.school_attendance.vd_rull_list,
  
  // 请假
  ask_now: state => state.ask.ask_now,
  ask_all: state => state.ask.ask_all,
  leave_type: state => state.ask.leave_type,
  monitor: state => state.ask.monitor
}
export default getters
