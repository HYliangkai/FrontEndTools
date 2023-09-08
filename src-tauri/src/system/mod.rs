use sysinfo::{ System, SystemExt, RefreshKind, CpuRefreshKind, CpuExt };
use serde;
#[derive(Debug, serde::Serialize)]
pub struct SystemInfo {
  mem_total: u64, //总内存
  mem_used: u64, //使用内存
  cpu_name: String, //cpu名称
  cpu_usage: f32, //cpu使用率
  cpu_frequency: u64, //cpu频率
}
impl SystemInfo {
  fn init(info: (u64, u64, String, f32, u64)) -> SystemInfo {
    return SystemInfo {
      mem_total: info.0,
      mem_used: info.1,
      cpu_name: info.2,
      cpu_usage: info.3,
      cpu_frequency: info.4,
    };
  }
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
  let mut system = System::new();
  system.refresh_memory();
  let s = System::new_with_specifics(RefreshKind::new().with_cpu(CpuRefreshKind::everything()));
  let global_cpu = s.global_cpu_info();
  let res = SystemInfo::init((
    system.total_memory(),
    system.used_memory(),
    global_cpu.brand().to_owned(),
    global_cpu.cpu_usage(),
    global_cpu.frequency(),
  ));
  return res;
}

#[test]
fn testing() {
  println!("{:?}", get_system_info())
}
