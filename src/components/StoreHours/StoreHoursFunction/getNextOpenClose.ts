// Fungsi untuk menentukan status buka/tutup dan waktu berikutnya
export function getNextOpenClose(
  now: Date, // Menggunakan 'now' yang di-pass dari interval di useStoreHoursPanel
  openHour: number,
  openMinute: number,
  closeHour: number,
  closeMinute: number
): {
  isOpen: boolean;
  nextOpen: Date;
  nextClose: Date;
} {
  const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday), Monday is 1

  const openTimeToday = new Date(now);
  openTimeToday.setHours(openHour, openMinute, 0, 0);

  const closeTimeToday = new Date(now);
  closeTimeToday.setHours(closeHour, closeMinute, 0, 0);

  let resultIsOpen: boolean;
  let resultNextOpen: Date;
  let resultNextClose: Date;

  if (currentDay === 1) { // Monday - Store is closed all day
    resultIsOpen = false;

    resultNextOpen = new Date(now);
    // If today is Monday (1), next open is Tuesday (2)
    resultNextOpen.setDate(now.getDate() + 1); // Tomorrow is Tuesday
    resultNextOpen.setHours(openHour, openMinute, 0, 0);

    resultNextClose = new Date(resultNextOpen);
    resultNextClose.setHours(closeHour, closeMinute, 0, 0);
  } else { // Not Monday - standard logic
    if (now < openTimeToday) { // Before opening hours today
      resultIsOpen = false;
      resultNextOpen = openTimeToday;
      resultNextClose = closeTimeToday;
    } else if (now >= openTimeToday && now < closeTimeToday) { // During opening hours today
      resultIsOpen = true;
      resultNextOpen = new Date(openTimeToday);
      // resultNextOpen.setDate(openTimeToday.getDate() + 1); // Next open is tomorrow - This will be handled by the check below
      resultNextClose = closeTimeToday; // Closes today
    } else { // After closing hours today
      resultIsOpen = false;
      resultNextOpen = new Date(openTimeToday);
      resultNextOpen.setDate(openTimeToday.getDate() + 1); // Next open is tomorrow
      resultNextClose = new Date(closeTimeToday);
      resultNextClose.setDate(closeTimeToday.getDate() + 1); // Next close is also tomorrow
    }

    // If it was open, nextOpen should be tomorrow. If it was closed (either before open or after close), nextOpen is already set for today or tomorrow.
    // We need to ensure that if the store was open today, the nextOpen is set for the next day.
    if (resultIsOpen) {
        // If store is currently open, next actual opening is tomorrow
        const tomorrowOpen = new Date(openTimeToday);
        tomorrowOpen.setDate(openTimeToday.getDate() + 1);
        resultNextOpen = tomorrowOpen;
    }

    // Now, check if the calculated resultNextOpen is a Monday
    if (resultNextOpen.getDay() === 1) { // If next scheduled open is Monday
      // Push it to Tuesday
      resultNextOpen.setDate(resultNextOpen.getDate() + 1);
      resultNextOpen.setHours(openHour, openMinute, 0, 0); // Ensure time is correct

      // And its corresponding close time also moves to Tuesday
      resultNextClose = new Date(resultNextOpen);
      resultNextClose.setHours(closeHour, closeMinute, 0, 0);
    }
  }

  return { isOpen: resultIsOpen, nextOpen: resultNextOpen, nextClose: resultNextClose };
}
