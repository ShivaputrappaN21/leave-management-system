export interface Department { deptId?: number; deptCode: string; deptName: string; location?: string; headName?: string; }

export interface Employee {
  empNo?: number; name: string; age: number; gender: string; email: string; salary: number;
  joinDate?: string; status?: string; department: { deptId: number; deptName?: string };
}

export interface LeaveType { leaveTypeId?: number; typeCode: string; typeName: string; maxDaysPerYear: number; paid: boolean; }

export interface LeaveBalance {
  balanceId?: number; employee: { empNo: number; name?: string }; leaveType: { leaveTypeId: number; typeName?: string };
  year: number; allottedDays: number; usedDays?: number;
}

export interface LeaveRequest {
  requestId?: number; employee: { empNo: number; name?: string }; leaveType: { leaveTypeId: number; typeName?: string };
  fromDate: string; toDate: string; days?: number; reason?: string; status?: string; appliedDate?: string;
}

export interface DashboardSummary {
  totalEmployees: number; pendingRequests: number; approvedRequests: number; onLeaveToday: number;
  daysByDepartment: { department: string; days: number }[]; upcomingLeaves: LeaveRequest[];
}
