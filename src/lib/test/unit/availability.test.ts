import {
  totalMinutes,
  minutesToString,
  getConsecutiveTimeSlots,
  sameDayCheck,
  getEndTimes,
} from "../../booking/availability";

describe("Booking availability utilities", () => {
  describe("totalMinutes", () => {
    it("converts a time string to total minutes", () => {
      expect(totalMinutes("10:30")).toBe(630);
      expect(totalMinutes("08:00")).toBe(480);
    });
  });

  describe("minutesToString", () => {
    it("converts minutes to HH:MM format", () => {
      expect(minutesToString(630)).toBe("10:30");
      expect(minutesToString(480)).toBe("08:00");
    });
  });

  describe("getConsecutiveTimeSlots", () => {
    it("generates 30-minute intervals", () => {
      expect(getConsecutiveTimeSlots("08:00", "10:00")).toEqual([
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
      ]);
    });

    it("returns a single slot when start and end are the same", () => {
      expect(getConsecutiveTimeSlots("08:00", "08:00")).toEqual([
        "08:00",
      ]);
    });
  });

  describe("sameDayCheck", () => {
    it("removes slots that are within the 15-minute cutoff", () => {
      const slots = [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
      ];

      // Current time = 10:10 → cutoff = 10:25
      const currentDate = new Date(2026, 7, 17, 10, 10);

      expect(sameDayCheck(slots, currentDate)).toEqual([
        "10:30",
        "11:00",
        "11:30",
      ]);
    });
  });

  describe("getEndTimes", () => {
    it("returns end times with a minimum duration of one hour", () => {
      const slots = [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
      ];

      expect(getEndTimes("08:00", slots)).toEqual([
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
      ]);
    });

    it("returns no end times when there is less than one hour available", () => {
      const slots = [
        "08:00",
        "08:30"
      ];

      expect(getEndTimes("08:00", slots)).toEqual([]);
    });
  });
});