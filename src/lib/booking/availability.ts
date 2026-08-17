
export function totalMinutes (time:string): number {
        const [hours, minutes] = time.split(':').map(Number);
        const Hours = hours * 60;
        return Hours + minutes;
};

export function minutesToString (minutes:number):string {
        const Hour = Math.floor(minutes / 60);
        const Minutes = minutes % 60;
        return`${Hour.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}`;
};

export function getConsecutiveTimeSlots (minTime:string, maxTime:string) {

    const startTime = totalMinutes(minTime);
    const endTime = totalMinutes(maxTime);
    const resolvedArray:string[] = []

    for (let current = startTime; current <= endTime; current+= 30) {
        resolvedArray.push(minutesToString(current));
    }

    return resolvedArray;
};


export function sameDayCheck (arr:string[], currentDate: Date): string[] | undefined {
      const currentMinute = currentDate.getHours() * 60 + currentDate.getMinutes();
      const cutOffTime = currentMinute + 15;

      const filteredSlots = arr.filter((timeStr) => {
        const slotMinutes= totalMinutes(timeStr);
        return slotMinutes > cutOffTime;
      });

        return filteredSlots;
};

export function getEndTimes (timeStr: string, Arr:string[] ) {
        const stringMinute = totalMinutes(timeStr);
        const minimumDuration = stringMinute + 60;
        const endTimes: string[] = [];

        for (let current = minimumDuration; Arr.includes(minutesToString(current)); current += 30) {
            endTimes.push(minutesToString(current));
        }
            return endTimes;
}
