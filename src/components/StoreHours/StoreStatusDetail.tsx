import React from "react";
import useTutorialStore from "../../app/hooks/useTutorialStore"; // Import useTutorialStore
// import useIsMobile from "@/app/hooks/useIsMobile"; // isMobile is not used anymore

const StoreStatusDetail = ({
  isOpen,
  openHour,
  openMinute,
  closeHour,
  closeMinute,
  countdown,
}: {
  isOpen: boolean;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  countdown: string;
  // expanded prop is removed
}) => {
  const { restartTutorial } = useTutorialStore(); // Get restartTutorial action

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}.${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const today = new Date();
  const isMonday = today.getDay() === 1; // 0 for Sunday, 1 for Monday

  // const { isMobile } = useIsMobile(); // isMobile is not used anymore

  return (
    <div className="ml-2 flex flex-col overflow-hidden w-full relative py-2 h-full">
      {" "}
      {/* Added h-full */}
      <span
        className={`text-[1em] leading-none font-bold text-gray-800 text-base mb-1 py-1.5 truncate fade-in`} // Replaced !opacity-100 with fade-in
      >
        {isOpen ? (
          <>
            <i className="fas fa-store mr-1.5"></i> Warung Buka
          </>
        ) : (
          <>
            <i className="fas fa-store-slash mr-1.5"></i> Warung Tutup
          </>
        )}
      </span>
      {/* Table section for operational hours and countdown - ALWAYS VISIBLE */}
      <table className="w-full text-[0.75em] mb-3">
        <tbody>
          {/* Removed !isWednesday condition */}
          <>
            <tr>
              <th className="text-left font-bold w-[8.5em] py-0.5 text-gray-500 shrink-0">
                Jam Operasional
              </th>
              <td className="py-0.5 px-1 font-medium text-gray-800">
                : {formatTime(openHour, openMinute)} -{" "}
                {formatTime(closeHour, closeMinute)} WIB
              </td>
            </tr>
            {!isMonday && ( // Hide countdown on Monday as it's not relevant
              <tr>
                <th className="text-left font-bold w-[8.5em] py-0.5 text-gray-500 shrink-0">
                  {isOpen ? "Tutup dalam" : "Buka dalam"}
                </th>
                <td className="py-0.5 px-1 font-medium text-gray-800">
                  : {countdown}
                </td>
              </tr>
            )}
          </>
        </tbody>
      </table>
      {isMonday ? (
        <span className="text-[0.75em] text-red-600 leading-tight break-words whitespace-normal mb-2 font-semibold fade-in">
          Mohon maaf, hari ini (Senin) warung tutup. Buka kembali besok pukul{" "}
          {formatTime(openHour, openMinute)} WIB.
        </span>
      ) : (
        <span className="text-[0.75em] text-gray-500 leading-tight break-words whitespace-normal mb-2 font-semibold fade-in">
          {" "}
          {/* Changed text-xs to text-[11px] */}
          {isOpen
            ? "Silahkan datang atau pesan sekarang!"
            : `Warung akan buka kembali pukul ${formatTime(
                openHour,
                openMinute
              )} WIB.`}
        </span>
      )}
      <span className="text-[0.75em] font-semibold break-words leading-tight whitespace-normal mb-2 fade-in">
        Lokasi warung kami di depan{" "}
        <b>Alfamart sebrang komplek Grand Purnama 2</b>
      </span>
      {/* Tombol untuk menampilkan lagi tutorialnya - always visible when StoreStatusDetail is rendered */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent StoreHours panel from closing
          restartTutorial();
        }}
        className="ms-1 mb-2 clicked transall mt-auto flex items-center justify-center text-[0.75em] font-bold text-blue-700 bg-blue-100 active:bg-blue-200 active:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md py-2 px-4 self-start group !select-none fade-in" // Added fade-in
        title="Ulangi Tutorial"
      >
        <i className="fas fa-redo mr-1.5 transition-transform duration-150 ease-in-out group-hover:scale-110"></i>
        Ulangi Tutorial
      </button>
    </div>
  );
};

export default StoreStatusDetail;
