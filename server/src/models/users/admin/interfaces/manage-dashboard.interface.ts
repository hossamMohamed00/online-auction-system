import { AdminDashboardData } from '../types/dashboard-data.type';

export interface ManageDashboardBehavior {
	//* List dashboard needed data
	listDashboardData(): Promise<AdminDashboardData>;
}
