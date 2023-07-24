/**
 * Định dạng thời gian theo fomat: ngày/tháng/năm
 * @param dates
 * @returns
 */
export const formatDate = (dates: string): string => {
  const date = new Date(dates);
  let day = date.getDate();
  if (day > 0 && day < 10) {
    day = Number(`0${day}`);
  }
  let month = date.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = Number(`0${month}`);
  }
  const year = date.getFullYear();
  // Hiển thị cho người dùng xem
  return `${day}/${month}/${year}`;
};

export const formatDate1 = (dates: string): string => {
  const date = new Date(dates);
  let day = date.getDate();
  if (day > 0 && day < 10) {
    day = Number(`0${day}`);
  }
  let month = date.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = Number(`0${month}`);
  }
  const year = date.getFullYear();
  // Gửi dữ liệu lên server
  return `${year}-${month}-${day}`;
};
