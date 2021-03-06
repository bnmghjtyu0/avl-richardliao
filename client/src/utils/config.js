export const Time = function(timeString) {
  var t = timeString.split(":");
  this.hour = parseInt(t[0]);
  this.minutes = parseInt(t[1]);
  this.isBiggerThan = function(other) {
    return (
      this.hour > other.hour ||
      (this.hour === other.hour && this.minutes > other.minutes)
    );
  };
};

export const timeIsBetween = function(start, end, check) {
  return start.hour <= end.hour
    ? check.isBiggerThan(start) && !check.isBiggerThan(end)
    : (check.isBiggerThan(start) && check.isBiggerThan(end)) ||
        (!check.isBiggerThan(start) && !check.isBiggerThan(end));
};
// export const isBetween = timeIsBetween(openTime, closeTime, checkTime);
