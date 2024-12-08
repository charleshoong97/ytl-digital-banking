export default function useHelper() {
  const formatWithThousandSeparator = (number: number) => {
    if (number == null || isNaN(number)) return "";

    return Number(number)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return { formatWithThousandSeparator };
}
