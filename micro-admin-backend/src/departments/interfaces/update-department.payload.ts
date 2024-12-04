export interface UpdateDepartmentPayload {
  id: string;
  updateDepartmentDto: {
    name: string;
    leader: string;
  };
}
