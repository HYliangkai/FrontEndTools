import {Option} from '@/utils/FP/mod'

export type SystemInfo = {
  mem_total: number //总内存
  mem_used: number //使用内存
  cpu_name: string //cpu名称
  cpu_usage: number //cpu使用率
  cpu_frequency: number //cpu频率
}
