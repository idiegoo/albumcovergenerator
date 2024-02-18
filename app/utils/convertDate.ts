const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function convertDate(date_str: string, datePrecision: string) {
  const temp_date = date_str.split("-");
  const res = months[Number(temp_date[1]) - 1] + " " + temp_date[2] + ", " + temp_date[0];

  if(datePrecision === "day") {
    return res
  } else if (datePrecision === "month") {
    return months[Number(temp_date[1]) - 1] + " " + temp_date[0]
  }
  else return temp_date[0]
}
