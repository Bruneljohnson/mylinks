let data;

/* FUNCTION USED TO CREATE FULL URL DEPENDING ON USER INPUT */
export const protocol = (enteredData) => {
  if (enteredData.startsWith("https://")) {
    data = {
      fullUrl: enteredData,
    };
  } else if (enteredData.startsWith("www.")) {
    data = {
      fullUrl: `https://${enteredData}`,
    };
  } else {
    data = {
      fullUrl: `https://www.${enteredData}`,
    };
  }
  return data;
};
